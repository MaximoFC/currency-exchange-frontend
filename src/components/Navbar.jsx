import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    return (
        <nav className='bg-gray-900 text-white p-4'>
            <ul className='flex justify-center space-x-12'>
                <li><Link to="/" className='hover:text-gray-400 transition'>Home</Link></li>
                <li><Link to="/clients" className='hover:text-gray-400 transition'>Clientes</Link></li>
                <li><Link to="/transactions" className='hover:text-gray-400 transition'>Movimientos</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar