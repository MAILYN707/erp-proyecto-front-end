import { FaUser, FaSignInAlt, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '@components/UserContext';

export function UserDropdown() {
  const { usuario, logout } = useUser();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const closeDropdown = () => setOpen(false);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white focus:outline-none flex items-center justify-center w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full transition"
      >
        <FaUser className="w-4 h-4" title="Tu perfil" />
      </button>

      {open && (
        <>
          {/* Overlay para cerrar al hacer clic afuera */}
          <div
            onClick={closeDropdown}
            className="fixed inset-0 z-40"
          ></div>

          {/* Menú */}
          <div className="absolute right-0 mt-2 z-50 w-52 bg-white shadow-xl rounded-lg overflow-hidden animate-fade-in">
            {!usuario ? (
              <Link
                to="/authenticate"
                className="flex items-center gap-3 px-4 py-3 text-[#345769] hover:bg-gray-100 font-medium transition"
                onClick={closeDropdown}
              >
                <FaSignInAlt className="text-lg" /> Iniciar sesión
              </Link>
            ) : (
              <>
                <Link
                  to="/tus-pedidos"
                  className="flex items-center gap-3 px-4 py-3 text-[#345769] hover:bg-gray-100 transition"
                  onClick={closeDropdown}
                >
                  <FaClipboardList /> Mis pedidos
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeDropdown();
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full transition"
                >
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
