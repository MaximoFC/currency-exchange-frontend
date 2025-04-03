import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Client from './pages/Clients';
import Transaction from './pages/Transaction';
import Navbar from "./components/navbar";

function App() {
    return(
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/clients" element={<Client/>} />
                <Route path="/transactions" element={<Transaction/>} />
            </Routes>
        </Router>
    );
}

export default App