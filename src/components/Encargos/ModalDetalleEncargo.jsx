import { FaTimes, FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaListUl, FaBox } from "react-icons/fa";

export function ModalDetalleEncargo({ encargo, onClose }) {
  const pedido = encargo?.pedidos?.[0];
  const detalles = pedido?.detalles_factura || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center px-4">

      <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
        <img
          src="/src/assets/icons/SupplyNet-logo.svg"
          alt="Logo Empresa"
          className="h-16 mb-4 mx-auto"
        />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition text-xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-[#345769] mb-6 flex items-center gap-2 mt-10">
          Detalles del Encargo
        </h2>

        <div className="grid gap-3 text-sm text-gray-700 mb-6">
          <p className="flex items-center gap-2">
            <FaUserTie className="text-[#345769]" />
            <strong>Cliente:</strong> {encargo?.comprador?.nombre || "—"}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#345769]" />
            <strong>Dirección:</strong> {pedido?.direccion_entrega || "—"}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#345769]" />
            <strong>Fecha de emisión:</strong> {encargo?.fecha_emision ? new Date(encargo.fecha_emision).toLocaleDateString() : "—"}
          </p>
          <p className="flex items-center gap-2">
            <FaListUl className="text-[#345769]" />
            <strong>Estado:</strong> {pedido?.estado || "—"}
          </p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-[#345769] mb-2">Productos incluidos:</h3>
          <ul className="divide-y divide-gray-200 text-sm">
            {detalles.length > 0 ? (
              detalles.map((detalle, index) => (
                <li key={index} className="py-2 flex flex-col gap-1">
                  <p><strong>Producto:</strong> {detalle.producto?.nombre || "—"}</p>
                  <p><strong>Cantidad:</strong> {detalle.cantidad}</p>
                  <p><strong>Precio unitario:</strong> ₡{parseInt(detalle.precio_unitario).toLocaleString()}</p>
                  <p><strong>Subtotal:</strong> ₡{parseInt(detalle.subtotal).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No hay productos registrados en este pedido.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
