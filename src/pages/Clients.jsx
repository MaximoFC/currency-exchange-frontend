import { useState } from "react";

const Clients = () => {
    const [formData, setFormData] = useState({
        name: "",
        cell: ""
    });

    const [message, setMessage] = useState("");

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
        </div>
    );
};

export default Clients