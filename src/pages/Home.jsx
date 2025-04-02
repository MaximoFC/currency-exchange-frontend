import { useState, useEffect } from "react";
import axios from "axios";
import ClientSelectionModal from "../components/ClientSelectionModal";
import InvestmentModal from "../components/InvestmentModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [formData, setFormData] = useState({
        type: "buy",
        fromCurrency: "ars",
        toCurrency: "usd",
        id_client: "",
        amount: "",
        price: ""
    });

    const [selectedClient, setSelectedClient] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [businessData, setBusinessData] = useState({
        ars: "...",
        usd: "...",
        eur: "..."
    });
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [exchangeRates, setExchangeRates] = useState({
        usd: { buy: "...", sell: "..." },
        eur: { buy: "...", sell: "..." }
    })

    const openInvestmentModal = (currency) => {
        setSelectedCurrency(currency);
        setIsInvestmentModalOpen(true);
    };

    const closeInvestmenModal = () => {
        setIsInvestmentModalOpen(false);
        setInvestmentAmount("");
    };

    useEffect(() => {
        const fetchBusinessData = axios.get("http://localhost:4000/businesses");
        const fetchExchangeRates = axios.get("https://api.bluelytics.com.ar/v2/latest");

        Promise.all([fetchBusinessData, fetchExchangeRates])
            .then(([businessResponse, exchangeResponse]) => {
                setBusinessData(businessResponse.data);
                setExchangeRates({
                    usd: {
                        buy: exchangeResponse.data.blue.value_buy,
                        sell: exchangeResponse.data.blue.value_sell
                    },
                    eur: {
                        buy: exchangeResponse.data.blue_euro.value_buy,
                        sell: exchangeResponse.data.blue_euro.value_sell
                    }
                });
            })
            .catch(error => console.error("Error fetching data: ", error.message));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedClient) {
            toast.warn("Selecciona un cliente");
            return;
        }

        if (formData.fromCurrency === formData.toCurrency) {
            toast.warn("Debes seleccionar monedas diferentes para la transacción");
            return;
        }

        if (!formData.amount || formData.amount <= 0) {
            toast.warn("Debes ingresar un monto válido");
            return;
        }

        if (!formData.price || formData.price <= 0) {
            toast.warn("Debes ingresar un precio válido");
            return;
        }

        const transactionData = {
            ...formData,
            amount: Number(formData.amount),
            price: Number(formData.price),
            id_client: selectedClient.id
        };

        try {
            await axios.post("http://localhost:4000/transactions", transactionData);
            toast.success("Transacción realizada con éxito");

            const response = await axios.get("http://localhost:4000/businesses");
            setBusinessData(response.data);

            setFormData({ type:"buy", fromCurrency: "ars", toCurrency:"usd", id_client:"", amount:"", price:"" });
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
            toast.warn("Ingresa un monto válido");
            return;
        }

        try {
            await axios.put("http://localhost:4000/businesses/update", {
                currency: selectedCurrency,
                amount: parseInt(investmentAmount)
            });

            toast.success("Inversión agregada con éxito");
            const response = await axios.get("http://localhost:4000/businesses");
            setBusinessData(response.data);
            closeInvestmenModal();
        } catch(error) {
            console.error("Error updating investment: ", error.message);
        }
    };

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-12">

            {/* Amounts */}
            
            <div className="text-black rounded-xl shadow-md flex flex-col border border-gray-300">
                <div className="bg-blue-100 p-6 rounded-t-xl">
                    <h3 className="text-xl font-semibold">$ Pesos (ARS)</h3>
                    <h5 className="text-sm text-gray-600">Disponible</h5>
                </div>
                <div className="flex flex-col p-6 items-center rounded-b-xl">
                    <div className="flex justify-around w-full items-center p-2">
                        <p className="text-xl">${businessData.ars}</p>                          
                        <button
                            className="bg-blue-100 text-black p-2 rounded-full mt-2 cursor-pointer hover:bg-blue-200 transition"
                            onClick={() => openInvestmentModal("ars")}
                        >
                            +
                        </button>
                    </div>
                    <div className="w-full flex justify-between items-center p-2">
                        <div>
                            <h4>Referencia</h4>
                            <p className="text-gray-500">1 USD = ${exchangeRates.usd.sell}</p>
                        </div>
                        <div>
                            <h4>Referencia</h4>
                            <p className="text-gray-500">1 EUR = ${exchangeRates.eur.sell}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-black rounded-xl shadow-md flex flex-col border border-gray-300">
                <div className="bg-green-100 p-6 rounded-t-xl">
                    <h3 className="text-xl font-semibold">$ Dólares (USD)</h3>
                    <h5 className="text-sm text-gray-600">Disponible</h5>
                </div>
                <div className="flex flex-col p-6 items-center rounded-b-xl">
                    <div className="flex justify-around w-full items-center p-2">
                        <p className="text-xl">${businessData.usd}</p>
                        <button
                            className="bg-green-100 text-black p-2 rounded-full mt-2 cursor-pointer hover:bg-green-200 transition"
                            onClick={() => openInvestmentModal("usd")}
                        >
                            +
                        </button>
                    </div>
                    <div className="w-full flex justify-between items-center p-2">
                        <div>
                            <h4>Compra</h4>
                            <p className="text-gray-500">${exchangeRates.usd.buy}</p>
                        </div>
                        <div>
                            <h4>Venta</h4>
                            <p className="text-gray-500">${exchangeRates.usd.sell}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-black rounded-xl shadow-md flex flex-col border border-gray-300">
                <div className="bg-yellow-100 p-6 rounded-t-xl">
                    <h3 className="text-xl font-semibold">€ Euros (EUR)</h3>
                    <h5 className="text-sm text-gray-600">Disponible</h5>
                </div>
                <div className="flex flex-col p-6 items-center rounded-b-xl">
                    <div className="flex justify-around w-full items-center p-2">
                        <p className="text-xl">${businessData.eur}</p>
                        <button
                            className="bg-yellow-100 text-black p-2 rounded-full mt-2 cursor-pointer hover:bg-yellow-200 transition"
                            onClick={() => openInvestmentModal("eur")}
                        >
                            +
                        </button>
                    </div>
                    <div className="w-full flex justify-between items-center p-2">
                        <div>
                            <h4>Compra</h4>
                            <p className="text-gray-500">${exchangeRates.eur.buy}</p>
                        </div>
                        <div>
                            <h4>Venta</h4>
                            <p className="text-gray-500">${exchangeRates.eur.sell}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}

            <div className="md:col-span-3 rounded-2xl shadow-md p-5 border border-gray-300 m-10">
                <h2 className="text-xl font-semibold mb-4">Realizar un cambio</h2>
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

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-sm font-medium">Desde</label>
                            <select name="fromCurrency" value={formData.fromCurrency} onChange={handleChange} className="w-full p-2 border rounded bg-white">
                                <option value="ars">Pesos (ARS)</option>
                                <option value="usd">Dólares (USD)</option>
                                <option value="eur">Euros (EUR)</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Hacia</label>
                            <select name="toCurrency" value={formData.toCurrency} onChange={handleChange} className="w-full p-2 border rounded bg-white">
                                <option value="ars">Pesos (ARS)</option>
                                <option value="usd">Dólares (USD)</option>
                                <option value="eur">Euros (EUR)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cliente</label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="hidden" 
                                value={selectedClient ? selectedClient.id : ""} 
                                name="id_client" 
                            />
                            <input 
                                type="text"
                                value={selectedClient ? selectedClient.name : ""}
                                readOnly
                                className="border p-2 rounded w-full bg-gray-100"
                                placeholder="Selecciona un cliente"
                            />
                            <button
                                type="button"
                                className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-900 cursor-pointer"
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
                        className="w-full bg-stone-800 text-white p-2 rounded hover:bg-stone-900 cursor-pointer"
                    >
                        Confirmar
                    </button>
                </form>
                <ToastContainer 
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
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