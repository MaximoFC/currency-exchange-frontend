import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [transactionsRes, clientsRes] = await Promise.all([
                    axios.get("http://localhost:4000/transactions"),
                    axios.get("http://localhost:4000/clients")
                ]);
    
                // Ordenar transacciones por fecha (de más reciente a más antigua)
                const sortedTransactions = transactionsRes.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
    
                setTransactions(sortedTransactions);
                setClients(clientsRes.data);
            } catch (error) {
                console.error("Error fetching data: ", error.message);
            }
        };
    
        fetchData();
    }, []);
    
    const clientMap = useMemo(() => {
        return clients.reduce((map, client) => {
            map[client.id] = client.name;
            return map;
        }, {});
    }, [clients]);

    const filteredTransactions = transactions.filter(transaction => 
        transaction.id.toString().includes(search)
    );


    return(
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Transacciones realizadas</h2>
            <input 
                type="text"
                placeholder="Buscar por número de movimiento"
                className="w-full p-2 border rounded mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Número de movimiento</th>
                            <th className="p-2 border">Fecha</th>
                            <th className="p-2 border">Moneda de pago</th>
                            <th className="p-2 border">Moneda de venta</th>
                            <th className="p-2 border">Monto</th>
                            <th className="p-2 border">Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(transaction =>(
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="p-2 border w-50">{transaction.id}</td>
                                <td className="p-2 border">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className="p-2 border">{transaction.fromcurrency.toUpperCase()}</td>
                                <td className="p-2 border">{transaction.tocurrency.toUpperCase()}</td>
                                <td className="p-2 border">{transaction.amount}</td>
                                <td className="p-2 border">{clientMap[transaction.id_client] || "Desconocido"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaction