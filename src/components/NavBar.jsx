import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
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
                <FaSearch />
                <FaShoppingCart />
                <FaUser />
            </div>
        </header>
    );
}