import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CubeIcon } from '@heroicons/react/24/solid';
import { UserDropdown } from "./UserDropdown";
import { useUser } from '@components/UserContext';


export function NavBar() {
    const { usuario } = useUser();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

   
    return (
        <header className="bg-gradient-to-r from-[#6C95B0] via-[#435C73] to-[#345769] text-white shadow-md font-serif font-bold px-6 md:px-[120px] py-4">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-start h-[50px] pr-2">
                    <img
                        src="/src/assets/icons/SupplyNet-logo.svg"
                        alt="SupplyNet Logo"
                        className="max-h-[60px] w-auto"
                    />
                </div>

                {/* Hamburguesa para móviles */}
                <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
                    {menuAbierto ? <FaTimes /> : <FaBars />}
                </div>

                {/* Menú central (escondido en móviles) */}
                <nav className="hidden md:flex gap-[80px] text-[18px] items-end pt-[25px] tracking-wide">


                    {usuario?.rol === 'Administrador' ? (
                        <>
                            <Link to="/admin/empresas-pendientes" className="text-[#D5DBDB] hover:opacity-80 font-medium">Empresas Pendientes</Link>
                            <Link to="/admin/empresas-aprobadas" className="text-[#D5DBDB] hover:opacity-80 font-medium">Empresas Aprobadas</Link>
                            <Link to="/admin/usuarios" className="text-[#D5DBDB] hover:opacity-80 font-medium">Usuarios</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="text-[#D5DBDB] hover:opacity-80 font-medium">Inicio</Link>
                            <Link to="/productos" className="text-[#D5DBDB] hover:opacity-80 font-medium">Productos</Link>
                            <Link to="/proveedores" className="text-[#D5DBDB] hover:opacity-80 font-medium">Proveedores</Link>
                            <Link to="/sobre-nosotros" className="text-[#D5DBDB] hover:opacity-80 font-medium">Sobre Nosotros</Link>
                            <Link to="/contactanos" className="text-[#D5DBDB] hover:opacity-80 font-medium">Contacto</Link>
                        </>
                    )}
                </nav>


                {/* Íconos a la derecha */}
                <div className="hidden md:flex gap-[40px] text-[1.1rem] items-center pt-[25px] text-white">
                    {usuario?.rol !== 'Administrador' && (
                        <>
                            <Link to="/tus-pedidos" title="Tus pedidos">
                                <CubeIcon className="w-5 h-10 text-white" />
                            </Link>
                            <Link to="/carrito" title="Carrito de compras">
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
                            <Link to="/admin/empresas-pendientes" onClick={cerrarMenu}>Empresas Pendientes</Link>
                            <Link to="/admin/empresas-aprobadas" onClick={cerrarMenu}>Empresas Aprobadas</Link>
                            <Link to="/admin/usuarios" onClick={cerrarMenu}>Usuarios</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" onClick={cerrarMenu}>Inicio</Link>
                            <Link to="/productos" onClick={cerrarMenu}>Productos</Link>
                            <Link to="/proveedores" onClick={cerrarMenu}>Proveedores</Link>
                            <Link to="/sobre-nosotros" onClick={cerrarMenu}>Sobre Nosotros</Link>
                            <Link to="/contactanos" onClick={cerrarMenu}>Contacto</Link>
                        </>
                    )}

                    <div className="flex items-center gap-4 mt-2 border-t border-white pt-4">
                        {usuario?.rol !== 'Administrador' && (
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