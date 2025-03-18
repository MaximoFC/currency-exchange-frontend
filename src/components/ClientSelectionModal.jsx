import { useState, useEffect } from "react";

const ClientSelectionModal = ({ onSelect, onClose, onAddNew }) => {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setClients([
            {id: 1, name: "Máximo Callejas"},
            {id: 2, name: "Fernando Apud"},
            {id: 3, name: "Roberto Gómez Bolaños"}
        ])
    })

    const filteredClients = clients ? clients.filter(client => 
        client.name.toLowerCase().includes(search.toLowerCase())
    ) : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Seleccionar cliente</h2>
                <input 
                    type="text"
                    placeholder="Buscar cliente"
                    className="w-full p-2 border rounded mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto">
                    {filteredClients.map(client => (
                        <div
                            key={client.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                            onClick={() => onSelect(client)}
                        >
                            {client.name}
                        </div>
                    ))}
                </div>
                <button
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    onClick={onAddNew}
                >
                    + Agregar Nuevo Cliente
                </button>
                <button
                    className="mt-2 w-full bg-gray-300 p-2 rounded-lg hover:bg-gray-400"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default ClientSelectionModal;