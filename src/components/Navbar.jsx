import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    return (
        <nav className='text-black p-6 flex justify-between border-b-1 border-gray-300'>
            <h2>Casa de cambio</h2>
            <div className='flex justify-between w-70'>
                <Link to="/" className='hover:text-gray-400 transition'>Home</Link>
                <Link to="/clients" className='hover:text-gray-400 transition'>Clientes</Link>
                <Link to="/transactions" className='hover:text-gray-400 transition'>Movimientos</Link>
            </div>
        </nav>
    );
};

export default Navbar