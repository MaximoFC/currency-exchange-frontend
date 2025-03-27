import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const ClientSelectionModal = ({ onSelect, onClose }) => {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const onAddNew = () => {
        navigate("/clients");
    }

    useEffect(() => {
        axios.get("http://localhost:4000/clients")
            .then(response => {
                setClients(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching clients: ", error.message);
                setLoading(false);
            });
    }, []);

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Seleccionar cliente</h2>
        {loading ? (
            <div className="flex justify-center items-center h-40"> {/* Sección de carga centrada */}
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#292526"
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            </div>
        ) : (
            <>
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
                    className="mt-4 w-full bg-stone-800 text-white p-2 rounded-lg hover:bg-stone-900 cursor-pointer"
                    onClick={onAddNew}
                >
                    + Agregar Nuevo Cliente
                </button>
                <button
                    className="mt-2 w-full bg-stone-300 p-2 rounded-lg hover:bg-stone-400 cursor-pointer"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </>
        )}
    </div>
</div>

    )
}

export default ClientSelectionModal;