import { useState, useEffect } from "react";
import axios from "axios";

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4000/transactions")
            .then(response => {
                const sortedTransactions = response.data.sort((a, b) => new Date(b.Date) - new Date(a.date));
                setTransactions(sortedTransactions);
            })
            .catch(error => console.error("Error fetching transactions: ", error.message));
    }, []);

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
                            <th className="p-2 border">Fecha</th>
                            <th className="p-2 border">Número de movimiento</th>
                            <th className="p-2 border">Moneda</th>
                            <th className="p-2 border">Monto</th>
                            <th className="p-2 border">Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(transaction =>(
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="p-2 border">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className="p-2 border">{transaction.id}</td>
                                <td className="p-2 border">{transaction.currency}</td>
                                <td className="p-2 border">{transaction.amount}</td>
                                <td className="p-2 border">{transaction.id_client}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaction