import { useState, useEffect } from "react";
import axios from "axios";
import ClientSelectionModal from "../components/ClientSelectionModal";
import InvestmentModal from "../components/InvestmentModal";

const Home = () => {
    const [formData, setFormData] = useState({
        type: "buy",
        name: "",
        amount: "",
        price: ""
    });

    const [selectedClient, setSelectedClient] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [businessData, setBusinessData] = useState({
        ars: 0,
        usd: 0,
        eur: 0
    });
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [investmentAmount, setInvestmentAmount] = useState("");

    const openInvestmentModal = (currency) => {
        setSelectedCurrency(currency);
        setIsInvestmentModalOpen(true);
    };

    const closeInvestmenModal = () => {
        setIsInvestmentModalOpen(false);
        setInvestmentAmount("");
    };

    useEffect(() => {
        axios.get("http://localhost:4000/businesses")
            .then(response => {
                setBusinessData(response.data);
            })
            .catch(error => console.error("Error fetching amounts: ", error.message));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!selectedClient) {
            alert("Selecciona un cliente");
            return;
        }

        const transactionData = {
            ...formData,
            clientId: selectedClient.id
        };

        try {
            await axios.post("http://localhost:4000/transactions", transactionData);
            alert("Transacción realizada con éxito");

            const response = await axios.get("http://localhost:4000/businesses");
            setBusinessData(response.data);

            setFormData({ type:"buy", name:"", amount:"", price:"" });
            setSelectedClient(null);
        } catch (error) {
            console.error("Error in transaction: ", error.message);
        }
    };

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);
    const handleSelectClient = (client) => {
        setSelectedClient(client);
        closeModal();
    };

    const handleInvestmentSubmit = async () => {
        if(!investmentAmount) {
            alert("Ingresa un monto válido");
            return;
        }

        try {
            await axios.put("http://localhost:4000/businesses/update", {
                currency: selectedCurrency,
                amount: parseInt(investmentAmount)
            });

            alert("Inversión agregada con éxito");
            const response = await axios.get("http://localhost:4000/businesses");
            setBusinessData(response.data);
            closeInvestmenModal();
        } catch(error) {
            console.error("Error updating investment: ", error.message);
        }
    };

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-12">

            {/* Montos */}
            
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold">Pesos (ARS)</h3>
                <p className="text-xl">{businessData.ars}</p>
                <button
                    className="bg-white text-blue-600 p-2 rounded-full mt-2"
                    onClick={() => openInvestmentModal("ars")}
                >
                    +
                </button>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold">Dólares (USD)</h3>
                <p className="text-xl">{businessData.usd}</p>
                <button
                    className="bg-white text-blue-600 p-2 rounded-full mt-2"
                    onClick={() => openInvestmentModal("usd")}
                >
                    +
                </button>
            </div>
            <div className="bg-yellow-600 text-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold">Euros (EUR)</h3>
                <p className="text-xl">{businessData.eur}</p>
                <button
                    className="bg-white text-blue-600 p-2 rounded-full mt-2"
                    onClick={() => openInvestmentModal("eur")}
                >
                    +
                </button>
            </div>

            {/* Formulario */}

            <div className="md:col-span-3 bg-gray-300 rounded-2xl shadow-md p-5">
                <h2 className="text-xl font-semibold mb-4">Realizar una transacción</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select 
                        name="type" 
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="buy">Compra</option>
                        <option value="sell">Venta</option>
                    </select>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cliente</label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="text"
                                value={selectedClient ? selectedClient.name : ""}
                                readOnly
                                className="border p-2 rounded w-full bg-gray-100"
                                placeholder="Selecciona un cliente"
                            />
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={openModal}
                            >
                                Seleccionar
                            </button>
                        </div>
                    </div>

                    <input 
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Monto"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <input 
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Confirmar
                    </button>
                </form>
            </div>
            {isOpenModal && (
                <ClientSelectionModal
                    onSelect={handleSelectClient}
                    onClose={closeModal}
                />
            )}
            <InvestmentModal
                isOpen={isInvestmentModalOpen}
                onClose={closeInvestmenModal}
                selectedCurrency={selectedCurrency}
                investmentAmount={investmentAmount}
                setInvestmentAmount={setInvestmentAmount}
                onConfirm={handleInvestmentSubmit}
            />
        </div>
    );
};

export default Home