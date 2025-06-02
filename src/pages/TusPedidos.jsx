import React, { useState, useEffect } from 'react';
import { BarraSeguimiento } from "../components/BarraSeguimiento.jsx";
import { Spinner } from "../components/Spinner.jsx"; 
import { axiosClient } from '../services/axiosClient.js';

export function TusPedidos({ pedido }) {
  const [mostrarTracking, setMostrarTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Simulamos carga artificial mientras llega el pedido
    const timer = setTimeout(() => setIsLoading(false), 1500); 

    return () => clearTimeout(timer);
  }, []);

  const toggleTracking = () => setMostrarTracking(prev => !prev);

  if (isLoading || !pedido) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen px-6 py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen px-6 py-10 font-poppins">
      <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-[#07484A] mb-4">Detalles del Pedido</h2>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="flex flex-col items-start">
            {pedido.estado && (
              <span className="text-[#07484A] italic font-semibold mb-2">
                Estado: {pedido.estado}
              </span>
            )}
            <img
              src={pedido.imagen || '/placeholder.jpg'}
              alt={pedido.nombre || 'Producto'}
              className="w-36 h-36 object-contain border rounded"
            />
          </div>

          <div className="text-sm text-gray-700 md:text-right space-y-1">
            <p><span className="font-semibold">Nombre:</span> {pedido.nombre}</p>
            <p><span className="font-semibold">Precio:</span> ₡ {pedido.precio?.toLocaleString()}</p>
            <p><span className="font-semibold">Cantidad:</span> {pedido.cantidad} artículo(s)</p>
            <p><span className="font-semibold">Proveedor:</span> {pedido.proveedor || 'No especificado'}</p>
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-6">
          <button
            onClick={toggleTracking}
            className="bg-[#345769] hover:bg-[#274256] text-white font-medium px-5 py-2 rounded-full transition"
          >
            {mostrarTracking ? 'Ocultar Seguimiento' : 'Rastrear'}
          </button>

          <button
            className="bg-[#C0392B] hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition"
          >
            Cancelar Pedido
          </button>
        </div>
      </div>

      {mostrarTracking && (
        <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-sm">
          <h3 className="text-lg font-semibold text-[#07484A] mb-3">Seguimiento del Pedido</h3>
          <BarraSeguimiento estadoActual={pedido.estado} />
        </div>
      )}
    </div>
  );
}
