export function ModalProveedor({ proveedor, onClose }) {
  if (!proveedor) return null;

  const logo = proveedor.logoEmpresa
    ? `http://localhost:8000/storage/${proveedor.logoEmpresa}`
    : '/images/placeholder.jpg';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all">
      <div className="bg-white w-2/4 h-2/4 rounded-xl shadow-lg animate-fadeIn relative">
        <div className="bg-[#345769B2] p-4 rounded-t-xl flex items-center justify-between opacity-95">
          <button
            onClick={onClose}
            className="absolute right-4 text-lg font-bold"
          >
            ×
          </button>
        </div>

        <img src={logo} alt="logo" className="w-40 h-40 object-contain mx-auto mb-4" />
        <p className="text-center text-sm text-gray-700">{proveedor.descripcion}</p>
      </div>
    </div>
  );
}
