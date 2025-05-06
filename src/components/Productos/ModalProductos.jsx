import React, { useState } from 'react';

export default function ModalProducto({ producto, onClose }) {
    const [cantidad, setCantidad] = useState(1);

    const incrementar = () => setCantidad(c => c + 1);
    const decrementar = () => setCantidad(c => (c > 1 ? c - 1 : 1));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="relative w-full max-w-6xl bg-white rounded-lg p-6 shadow-lg animate-fade-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-700">✕</button>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagen con flechas */}
                    <div className="relative flex justify-center items-center w-full md:w-1/2 h-64">
                        <button className="absolute left-0 bg-white border border-gray-300 rounded px-2 py-1">❮</button>
                        <img
                            src={`http://localhost:8000/${producto.imagenes?.[0]?.imagen}` || '/placeholder.jpg'}
                            alt="Producto"
                            className="max-h-full object-contain"
                        />
                        <button className="absolute right-0 bg-white border border-gray-300 rounded px-2 py-1">❯</button>
                    </div>

                    {/* Detalles */}
                    <div className="flex flex-col gap-2 md:w-1/2">
                        <h2 className="text-xl font-semibold text-[#07484A]">{producto.nombre}</h2>
                        <p><span className="font-medium">Categoría:</span> {producto.categoria?.nombre}</p>
                        <p><span className="text-sm">Nombre Empresa:</span> {producto.empresa?.nombre}</p>
                        <p className="text-sm">Descripción: <span></span>
                            {producto.descripcion || 'Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                        </p>

                        <div className="mt-4 p-4 border rounded-lg w-full max-w-xs self-end">
                            <p className="text-lg font-bold mb-4">₡ {producto.precio.toLocaleString()}</p>
                            <div className="flex items-center justify-between mb-4">
                                <button onClick={decrementar} className="px-3 py-1 border rounded">-</button>
                                <span className="text-sm">Cantidad: {cantidad}</span>
                                <button onClick={incrementar} className="px-3 py-1 border rounded">+</button>
                            </div>
                            <button className="flex items-center justify-center gap-2 w-full bg-[#07484A] text-white py-2 rounded hover:bg-[#066060]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25a1.125 1.125 0 001.125.75h11.25a1.125 1.125 0 001.125-1.125V6.375a1.125 1.125 0 00-1.125-1.125H6.091m-.984 0L4.5 3.75m0 0H2.25" />
                                </svg>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
