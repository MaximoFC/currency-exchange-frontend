import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    return (
        <nav>
            <h2 className='text-3xl font-bold text-blue-500'>Tailwind si o no?</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/clients">Clientes</Link></li>
                <li><Link to="/transactions">Movimientos</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar