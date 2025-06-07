import { useState } from "react";
import { axiosClient } from "@services/axiosClient";
import { toast } from "react-hot-toast";
import { FaTimes, FaHourglassHalf } from "react-icons/fa";

export function ModalModificarEstado({ encargo, onClose, onEstadoActualizado }) {
  const [actualizando, setActualizando] = useState(false);

  const handleActualizar = async () => {
    const idPedido = encargo?.pedidos?.[0]?.id_pedido;
    if (!idPedido) {
      toast.error("ID de pedido no válido");
      return;
    }

    try {
      setActualizando(true);

      await axiosClient.patch(`/pedidos/${idPedido}/estado`); // No enviamos estado manual

      toast.success("Estado actualizado correctamente");

      // Notifica al componente padre si se requiere actualizar la vista
      if (onEstadoActualizado) {
        onEstadoActualizado(); // Podés también enviar ID o data si lo necesitas
      }

      onClose(); // Cierra el modal
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

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition text-xl"
        >
          <FaTimes />
        </button>

        <div className="mb-6 mt-12 text-center">
          <h2 className="text-xl font-semibold text-[#345769] mb-2 flex items-center justify-center gap-2">
            <FaHourglassHalf /> Modificar estado del pedido
          </h2>
          <p className="text-gray-700 text-sm">
            Este pedido es de:{" "}
            <span className="font-medium text-[#345769]">{encargo.comprador?.nombre || '—'}</span>
          </p>
        </div>

        <button
          onClick={handleActualizar}
          disabled={actualizando}
          className={`w-full py-2 text-white rounded font-semibold transition ${
            actualizando
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#345769] hover:bg-[#2b465e]"
          }`}
        >
          {actualizando ? "Actualizando estado..." : "Avanzar al siguiente estado"}
        </button>
      </div>
    </div>
  );
}
