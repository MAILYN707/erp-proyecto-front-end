export function ModalProveedor({ proveedor, onClose }) {
  if (!proveedor) return null;

  const logo = proveedor.logoEmpresa
    ? `http://localhost:8000/storage/${proveedor.logoEmpresa}`
    : '/images/placeholder.jpg';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all">
      <div className="bg-white w-96 p-6 rounded shadow-lg animate-fadeIn relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-lg font-bold"
        >
          ×
        </button>
        <img src={logo} alt="logo" className="w-40 h-40 object-contain mx-auto mb-4" />
        <p className="text-center text-sm text-gray-700">{proveedor.descripcion}</p>
      </div>
    </div>
  );
}
