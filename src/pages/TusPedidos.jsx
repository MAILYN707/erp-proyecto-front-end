import React, { useState, useEffect } from 'react';
import { BarraSeguimiento } from "@components/BarraSeguimiento.jsx";
import { Spinner } from "@components/Spinner.jsx";
import { axiosClient } from '@services/axiosClient.js';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export function TusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarEntregados, setMostrarEntregados] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seguimientoVisible, setSeguimientoVisible] = useState(null);

  const obtenerPedidos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosClient.get("/mis-pedidos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data?.data || [];

      console.log("Pedidos recibidos del backend:", data);

      const pedidosValidos = data.filter(p => {
        const producto = p.detalles_factura?.[0]?.producto;
        const estado = p.estado;
        return producto && estado;
      });

      const pendientes = pedidosValidos.filter(p => {
        const estado = (p.estado || '').toLowerCase();
        return estado !== 'entregado';
      });

      const entregados = pedidosValidos.filter(p => {
        const estado = (p.estado || '').trim().toLowerCase();
        return estado === 'entregado';
      });

      setPedidos([...pendientes, ...entregados]);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      toast.error("No se pudieron cargar tus pedidos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const toggleSeguimiento = (id) => {
    setSeguimientoVisible(prev => (prev === id ? null : id));
  };

  const cancelarPedido = async (idPedido) => {
    try {
      const token = localStorage.getItem("token");
      await axiosClient.patch(`/pedidos/${idPedido}/estado`, {
        estado: "Cancelado"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Pedido cancelado correctamente");
      obtenerPedidos();
    } catch (error) {
      console.error("Error al cancelar el pedido:", error);
      toast.error("No se pudo cancelar el pedido");
    }
  };

  const pedidosVisibles = mostrarEntregados
    ? pedidos
    : pedidos.filter(p => (p.estado || '').toLowerCase() !== 'entregado');

  if (isLoading) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen px-6 py-10">
        <Spinner mensaje="Cargando pedidos..." />
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] min-h-screen px-6 py-10 font-poppins">
      <h1 className="text-3xl font-bold text-[#07484A] mb-6 text-center">Tus Pedidos</h1>
      <div className='flex justify-end items-end text- mb-4'>
        {!mostrarEntregados && (
          <button
            onClick={() => setMostrarEntregados(true)}
            className="mx-auto mb-6 flex items-center gap-2 text-[#345769] font-medium"
          >
            <FaChevronDown /> Ver pedidos entregados
          </button>
        )}

        {mostrarEntregados && (
          <button
            onClick={() => setMostrarEntregados(false)}
            className="mx-auto mb-6 flex items-center gap-2 text-[#345769] font-medium"
          >
            <FaChevronUp /> Ocultar pedidos entregados
          </button>
        )}
      </div>


      {pedidosVisibles.map((pedido) => {
        const estado = pedido.estado || '—';
        const entregado = estado.toLowerCase() === 'entregado';
        const producto = pedido.detalles_factura?.[0]?.producto;
        const cantidad = pedido.detalles_factura?.[0]?.cantidad;

        if (!producto) return null;

        const imagenRuta = producto.imagenes?.[0]?.imagen;
        const imagenUrl = imagenRuta
          ? `https://erp-proyecto-back-end.onrender.com/storage/${imagenRuta}`
          : '/images/placeholder.jpg';

        console.log("Producto:", producto);
        console.log("Ruta de imagen:", producto.imagenes?.[0]?.imagen);

        return (
          <div
            key={pedido.id_factura}
            className={`bg-white rounded-xl p-6 border ${entregado ? 'border-green-600' : 'border-gray-300'} shadow-sm mb-8`}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="flex flex-col items-start">
                <span className={`text-sm font-semibold mb-2 ${entregado ? 'text-green-700' : 'text-[#07484A]'}`}>
                  Estado: {estado}
                </span>
                <img
                  src={imagenUrl}
                  alt={producto?.nombre || 'Producto'}
                  className="w-36 h-36 object-contain border rounded"
                />
              </div>

              <div className="text-sm text-gray-700 md:text-right space-y-1">
                <p><span className="font-semibold">Nombre:</span> {producto?.nombre || '—'}</p>
                <p><span className="font-semibold">Precio:</span> ₡{parseInt(producto?.precio || 0).toLocaleString()}</p>
                <p><span className="font-semibold">Cantidad:</span> {cantidad || 0} artículo(s)</p>
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <button
                onClick={() => toggleSeguimiento(pedido.id_factura)}
                className="bg-[#345769] hover:bg-[#274256] text-white font-medium px-5 py-2 rounded-full transition"
              >
                {seguimientoVisible === pedido.id_factura ? 'Ocultar Seguimiento' : 'Rastrear'}
              </button>

              {!entregado && (
                <button
                  onClick={() => cancelarPedido(pedido.id_pedido)}
                  className="bg-[#C0392B] hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition"
                >
                  Cancelar Pedido
                </button>
              )}
            </div>

            {seguimientoVisible === pedido.id_factura && (
              <div className="bg-white mt-6 p-6 border rounded-xl">
                <h3 className="text-lg font-semibold text-[#07484A] mb-3">Seguimiento del Pedido</h3>
                <BarraSeguimiento estadoActual={estado} />
              </div>
            )}
          </div>
        );
      })}

      {pedidosVisibles.length === 0 && (
        <div className="text-center text-gray-500 text-sm justify-center flex items-center h-64">
          No tienes pedidos disponibles.
        </div>
      )}
    </div>
  );
}
