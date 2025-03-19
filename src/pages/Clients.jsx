import { useState, useEffect } from "react";
import axios from "axios";

const Clients = () => {
    const [formData, setFormData] = useState({
        name: "",
        cell: ""
    });

    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4000/clients")
            .then(response => setClients(response.data))
            .catch(error => console.error("Error fetching clients: ", error.message));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return(
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Registrar cliente</h2>
            {message && <p className="mb-4 text-center text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre del cliente"
                    className="w-full p-2 border rounded bg-white"
                    required
                />
                <input 
                    type="tel"
                    name="cell"
                    value={formData.cell}
                    onChange={handleChange}
                    placeholder="Teléfono del cliente"
                    className="w-full p-2 border rounded bg-white"
                    required
                />
                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Confirmar
                </button>
            </form>

            <h2 className="text-xl font-semibold my-4">Lista de Clientes</h2>
            <input 
                type="text"
                placeholder="Buscar cliente"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.filter(client => 
                        client.name.toLowerCase().includes(search.toLowerCase())
                    ).map(client => (
                        <tr key={client.id}>
                            <td className="border p-2">{client.name}</td>
                            <td className="border p-2">{client.cell}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clients