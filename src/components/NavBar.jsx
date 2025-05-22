import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CubeIcon } from '@heroicons/react/24/solid';


import '../styles/navbar.css';

export function NavBar() {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <img src="/src/assets/icons/SupplyNet-logo.svg" alt="Logo SupplyNet" className="logo" />
            </div>

            <nav className="navbar-center">
                <Link to="/">Inicio</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/proveedores">Proveedores</Link>
                <Link to="/sobre-nosotros">Sobre Nosotros</Link>
                <Link to="/contactanos">Contacto</Link>
            </nav>

            <div className="navbar-right">
                <Link to="/tus-pedidos" title="Tus pedidos"><CubeIcon className="w-5 h-10 text-white" /></Link>
                <Link to="/carrito" title="Carrito de compras"> <FaShoppingCart /></Link>
                <FaUser title="Tu perfil" />
            </div>
        </header>
    );
}