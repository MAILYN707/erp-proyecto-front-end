import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CubeIcon } from '@heroicons/react/24/solid';
import { UserDropdown } from "./UserDropdown";
import { useUser } from '@components/UserContext';

export function NavBar() {
    const { usuario } = useUser();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    const navLinkClass = ({ isActive }) =>
        `relative nav-link ${isActive ? 'nav-link-active text-white' : 'text-[#D5DBDB]'}`;


    return (
        <header className="font-playfair bg-gradient-to-r from-[#6C95B0] via-[#435C73] to-[#345769] text-white shadow-md font-bold px-6 md:px-[120px] py-4">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/">
                    <div className="flex items-start h-[50px] pr-2">
                        <img
                            src="/src/assets/icons/SupplyNet-logo.svg"
                            alt="SupplyNet Logo"
                            className="max-h-[60px] w-auto"
                        />
                    </div>
                </Link>

                {/* Hamburguesa para móviles */}
                <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
                    {menuAbierto ? <FaTimes /> : <FaBars />}
                </div>

                {/* Menú central (escondido en móviles) */}
                <nav className="hidden md:flex gap-[80px] text-[18px] items-end pt-[25px] tracking-wide">
                    {usuario?.rol === 'Administrador' ? (
                        <>
                            <NavLink to="/admin/empresas-pendientes" className={navLinkClass}>Empresas Pendientes</NavLink>
                            <NavLink to="/admin/empresas-aprobadas" className={navLinkClass}>Empresas Aprobadas</NavLink>
                            <NavLink to="/admin/usuarios" className={navLinkClass}>Usuarios</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
                            <NavLink to="/productos" className={navLinkClass}>Productos</NavLink>
                            <NavLink to="/proveedores" className={navLinkClass}>Proveedores</NavLink>
                            <NavLink to="/sobre-nosotros" className={navLinkClass}>Sobre Nosotros</NavLink>
                            <NavLink to="/contactanos" className={navLinkClass}>Contacto</NavLink>
                        </>
                    )}
                </nav>

                {/* Íconos a la derecha */}
                <div className="hidden md:flex gap-[40px] text-[1.1rem] items-center pt-[25px] text-white">
                    {usuario && usuario.rol !== 'Administrador' && (
                        <>
                            <Link to="/tus-pedidos" title="Tus pedidos" className="nav-icon">
                                <CubeIcon className="w-5 h-10 text-white" />
                            </Link>
                            <Link to="/carrito" title="Carrito de compras" className="nav-icon">
                                <FaShoppingCart />
                            </Link>
                        </>
                    )}
                    <UserDropdown />
                </div>

            </div>

            {/* Menú mobile expandido */}
            {menuAbierto && (
                <div className="flex flex-col mt-4 md:hidden gap-4 text-[#D5DBDB] text-base">
                    {usuario?.rol === 'Administrador' ? (
                        <>
                            <NavLink to="/admin/empresas-pendientes" onClick={cerrarMenu} className={navLinkClass}>Empresas Pendientes</NavLink>
                            <NavLink to="/admin/empresas-aprobadas" onClick={cerrarMenu} className={navLinkClass}>Empresas Aprobadas</NavLink>
                            <NavLink to="/admin/usuarios" onClick={cerrarMenu} className={navLinkClass}>Usuarios</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" onClick={cerrarMenu} className={navLinkClass}>Inicio</NavLink>
                            <NavLink to="/productos" onClick={cerrarMenu} className={navLinkClass}>Productos</NavLink>
                            <NavLink to="/proveedores" onClick={cerrarMenu} className={navLinkClass}>Proveedores</NavLink>
                            <NavLink to="/sobre-nosotros" onClick={cerrarMenu} className={navLinkClass}>Sobre Nosotros</NavLink>
                            <NavLink to="/contactanos" onClick={cerrarMenu} className={navLinkClass}>Contacto</NavLink>
                        </>
                    )}

                    <div className="flex items-center gap-4 mt-2 border-t border-white pt-4">
                        {usuario && usuario.rol !== 'Administrador' && (
                            <>
                                <Link to="/carrito" title="Carrito"><FaShoppingCart /></Link>
                                <Link to="/tus-pedidos" title="Pedidos"><CubeIcon className="w-5 h-6 text-white" /></Link>
                            </>
                        )}
                        <UserDropdown />
                    </div>


                </div>
            )}
        </header>
    );
}
