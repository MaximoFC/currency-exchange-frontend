import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Client from './pages/Clients';
import Transaction from './pages/Transaction';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/clients" element={<Client/>} />
                <Route path="/transactions" element={<Transaction/>} />
            </Routes>
        </Router>
    );
}

export default App