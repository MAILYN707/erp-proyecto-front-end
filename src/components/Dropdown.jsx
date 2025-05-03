import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUser } from 'react-icons/fa';

export default function DashboardEmpresa() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);

    // Protege el acceso al dashboard solo si el usuario está autenticado y es empresa
    useEffect(() => {
        if (!user || !user.empresaAutenticada) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Cierra el menú si se hace clic fuera de él
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!user || !user.empresaAutenticada) {
        return null;
    }

    return (
        <div className="relative min-h-screen bg-gray-100 p-8 font-poppins">
            <div className="absolute top-6 right-6">
                <button onClick={() => setMenuVisible(!menuVisible)} className="text-[#07484A] text-xl">
                    <FaUser />
                </button>

                {menuVisible && (
                    <div ref={menuRef} className="mt-2 w-56 bg-white rounded shadow-lg border absolute right-0 z-10">
                        <button onClick={() => navigate('/publicar-producto')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Publicar Producto
                        </button>
                        <button onClick={() => navigate('/mis-productos')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Mis Productos
                        </button>
                        <button onClick={() => navigate('/encargos')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Encargos
                        </button>
                        <button onClick={() => navigate('/perfil-empresa')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Perfil de Empresa
                        </button>
                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mt-20">
                <h2 className="text-2xl font-semibold text-[#07484A] mb-6">Bienvenido, {user.nombreEmpresa}</h2>
                <p className="text-gray-600">Usa el menú del usuario (arriba a la derecha) para navegar por las opciones del Dashboard.</p>
            </div>
        </div>
    );
}