const InvestmentModal = ({ isOpen, onClose, selectedCurrency, investmentAmount, setInvestmentAmount, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Agregar capital en {selectedCurrency.toUpperCase()}</h2>
                <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Ingrese el monto"
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex flex-col gap-2">
                    <button
                        className="bg-stone-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-stone-900"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </button>
                    <button
                        className="bg-stone-300 px-4 py-2 rounded cursor-pointer hover:bg-stone-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvestmentModal;