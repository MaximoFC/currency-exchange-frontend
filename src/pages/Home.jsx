import { useState } from "react";

const Home = () => {
    const [formData, setFormData] = useState({
        type: "buy",
        name: "",
        amount: "",
        price: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

            {/* Montos */}
            
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold">Pesos (ARS)</h3>
                <p className="text-xl">100</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold">Dólares (USD)</h3>
                <p className="text-xl">100</p>
            </div>
            <div className="bg-yellow-600 text-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold">Euros (EUR)</h3>
                <p className="text-xl">100</p>
            </div>

            {/* Formulario */}

            <div className="md:col-span-3 bg-gray-100 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Realizar una transacción</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select 
                        name="type" 
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="buy">Compra</option>
                        <option value="sell">Venta</option>
                    </select>
                    <input 
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Monto"
                        className="w-full p-2 border rounded"
                    />
                    <input 
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home