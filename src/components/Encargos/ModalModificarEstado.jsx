import { useState } from "react";
import { axiosClient } from "@services/axiosClient";
import { toast } from "react-hot-toast";
import { FaTimes, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

export function ModalModificarEstado({ encargo, onClose, onEstadoActualizado }) {
  const [estado, setEstado] = useState(encargo?.pedidos?.[0]?.estado || '');
  const [actualizando, setActualizando] = useState(false);

  const handleActualizar = async () => {
    if (!estado) return;

    try {
      setActualizando(true);
      await axiosClient.patch(`/pedidos/${encargo.pedidos[0].id_pedido}/estado`, {
        estado,
      });

      toast.success("Estado actualizado correctamente");

      if (onEstadoActualizado) {
        onEstadoActualizado(encargo.id_factura, estado); // si querés actualizar manualmente
      }

      onClose(); // cierra el modal
    } catch (error) {
      console.error("Error actualizando estado:", error);
      toast.error("Error al actualizar el estado");
    } finally {
      setActualizando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center px-4">

      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full relative">
        <img
          src="/src/assets/icons/SupplyNet-logo.svg"
          alt="Logo Empresa"
          className="h-16 mb-4 mx-auto"
        />
        {/* Botón cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition text-xl ">
          <FaTimes />
        </button>

        <div className="mb-6 mt-12">
          <h2 className="text-xl font-semibold text-[#345769] mb-2 flex items-center gap-2">
            <FaHourglassHalf /> Modificar estado
          </h2>

          {/* Info */}
          <p className="text-gray-700 mb-3 text-sm">
            Cambia el estado del encargo del cliente:
            <span className="font-medium text-[#345769]"> {encargo.comprador?.nombre || '—'} </span>
          </p>
        </div>
        <label className="block text-gray-700 text-sm mb-2">Nuevo estado:</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-gray-700"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="Pedido">Pedido</option>
          <option value="En proceso">En proceso</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">En Entrega</option>
          <option value="Entregado">Listo para ser recogido</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        <button
          onClick={handleActualizar}
          disabled={actualizando || !estado}
          className={`w-full py-2 text-white rounded font-semibold transition ${actualizando ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#345769] hover:bg-[#2b465e]'
            }`}
        >
          {actualizando ? "Actualizando estado..." : "Actualizar estado"}
        </button>
      </div>
    </div>
  );
}
