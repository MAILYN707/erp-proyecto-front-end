import { BarraSeguimiento } from "../components/BarraSeguimiento.jsx";
import React, { useState } from 'react';
import { axiosClient } from '../services/axiosClient.js';

export function TusPedidos({ pedido }) {
    const [mostrarTracking, setMostrarTracking] = useState(false);

    const toggleTracking = () => {
        setMostrarTracking(prev => !prev);
    };

    if (!pedido) {
        return (
            <div className="bg-[#f5f5f5] min-h-screen px-6 py-10">
                <p className="text-center text-gray-600">Cargando información del pedido...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f5f5f5] min-h-screen px-6 py-10">
            <div className="bg-white rounded-xl p-6 border border-gray-300 mb-8">
                <h2 className="text-2xl font-bold mb-4">Tus pedidos</h2>

                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                    <div className="flex flex-col items-start">
                        {pedido.estado && (
                            <span className="text-[#07484A] italic font-semibold mb-2">
                                {pedido.estado}
                            </span>
                        )}
                        <img
                            src={pedido.imagen || '/placeholder.jpg'}
                            alt="Producto"
                            className="w-36 h-36 object-contain border"
                        />
                    </div>

                    <div className="text-sm text-gray-600 md:text-right">
                        <p><span className="font-semibold">Nombre:</span> {pedido.nombre}</p>
                        <p><span className="font-semibold">Precio:</span> $ {pedido.precio}</p>
                        <p><span className="font-semibold">Cantidad:</span> {pedido.cantidad} artículo</p>
                        <p><span className="font-semibold">Proveedor:</span> {pedido.proveedor}</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-end mt-6">
                    <button
                        onClick={toggleTracking}
                        className="bg-[#345769] hover:bg-[#274256] text-white font-medium px-5 py-2 rounded-full"
                    >
                        Rastrear
                    </button>

                    <button
                        className="bg-[#C0392B] hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full"
                    >
                        Cancelar Pedido
                    </button>
                </div>
            </div>

            {mostrarTracking && (
                <div className="bg-white rounded-xl p-6 border border-gray-300">
                    <BarraSeguimiento estadoActual={pedido.estado} />
                </div>
            )}
        </div>
    );
}
