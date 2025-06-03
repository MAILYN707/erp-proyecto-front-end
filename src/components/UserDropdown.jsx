import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaPlusSquare,
  FaBoxOpen,
  FaTruck,
  FaBuilding
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '@components/UserContext';
import { useNavigate } from 'react-router-dom';

export function UserDropdown() {
  const { usuario, logout, loading } = useUser(); // incluye loading
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setOpen(!open);
  const closeDropdown = () => setOpen(false);

  
  if (loading) return null;

  
  if (!usuario) {
    return (
      <div className="relative">
        <Link
          to="/authenticate"
          className="text-white flex items-center justify-center w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full transition"
        >
          <FaUser title="Iniciar sesión" className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  //Usuario logueado (Empresa o Admin)
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white focus:outline-none flex items-center justify-center w-8 h-8 rounded-full transition"
      >
        <FaUser className="w-4 h-4" title="Tu perfil" />
      </button>

      {open && (
        <>
          {/* Cierre si se hace clic afuera */}
          <div onClick={closeDropdown} className="fixed inset-0 z-40" />

          <div className="absolute right-0 mt-2 z-50 w-52 bg-white shadow-xl rounded-lg overflow-hidden animate-fade-in">
            {usuario.rol === 'Empresa' ? (
              <>
                <Link
                  to="/publicar"
                  className="flex items-center gap-3 px-4 py-3 text-[#345769] hover:bg-gray-100 font-medium transition"
                  onClick={closeDropdown}
                >
                  <FaPlusSquare /> Publicar producto
                </Link>
                <Link
                  to="/mis-productos"
                  className="flex items-center gap-3 px-4 py-3 text-[#345769] hover:bg-gray-100 font-medium transition"
                  onClick={closeDropdown}
                >
                  <FaBoxOpen /> Mis productos
                </Link>
                <Link
                  to="/encargos"
                  className="flex items-center gap-3 px-4 py-3 text-[#345769] hover:bg-gray-100 font-medium transition"
                  onClick={closeDropdown}
                >
                  <FaTruck /> Encargos
                </Link>
                <Link
                  to="/perfil-empresa"
                  className="flex items-center gap-3 px-4 py-3 text-[#345769] hover:bg-gray-100 font-medium transition"
                  onClick={closeDropdown}
                >
                  <FaBuilding /> Perfil de empresa
                </Link>
              </>
            ) : (
              <>
                
              </>
            )}

            <button
              onClick={() => {
                logout();
                closeDropdown();
                navigate('/authenticate');
              }}
              className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full transition"
            >
              <FaSignOutAlt /> Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}
