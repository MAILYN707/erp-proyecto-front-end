import { useEffect, useState } from 'react';
import { CubeIcon } from '@heroicons/react/24/solid';
import { Trash2 } from 'lucide-react';

export function Carrito() {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        // Simulamos que se carga desde localStorage o backend
        const itemsGuardados = JSON.parse(localStorage.getItem('carrito')) || [];
        setCarrito(itemsGuardados);
    }, []);

    const actualizarCantidad = (id, cambio) => {
        const actualizado = carrito.map((producto) =>
            producto.id === id
                ? { ...producto, cantidad: Math.max(1, producto.cantidad + cambio) }
                : producto
        );
        setCarrito(actualizado);
        localStorage.setItem('carrito', JSON.stringify(actualizado));
    };

    const eliminarProducto = (id) => {
        const nuevo = carrito.filter((p) => p.id !== id);
        setCarrito(nuevo);
        localStorage.setItem('carrito', JSON.stringify(nuevo));
    };

    const totalProductos = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const envio = subtotal >= 200 ? 0 : 9.95;
    const total = subtotal + envio;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Mi carrito</h2>
                        <p className="text-sm text-gray-700">0 artículos</p>
                    </div>

                    <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
                        <CubeIcon className="w-5 h-5 text-black" />
                        <span className='font-medium'>Envío</span>
                    </div>
                
                    {carrito.length === 0 ? (
                        <p className="text-center text-gray-500 mt-12">Tu carrito está vacío.</p>
                    ) : carrito.map(producto => (
                        <div key={producto.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                            <img src={producto.imagen} alt="producto" className="w-32 h-32 object-cover rounded-md" />
                            <div className="flex flex-col text-sm text-gray-700 w-full">
                                <p className="font-semibold text-black">{producto.nombre}</p>
                                <p>{producto.genero}</p>
                                <p>Color: {producto.color}</p>
                                <p>Talla: {producto.talla}</p>
                                <p>Proveedor: {producto.proveedor}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span>Cant</span>
                                    <button className="border px-2 rounded" onClick={() => actualizarCantidad(producto.id, -1)}>-</button>
                                    <span>{producto.cantidad}</span>
                                    <button className="border px-2 rounded" onClick={() => actualizarCantidad(producto.id, 1)}>+</button>
                                </div>
                            </div>

                            <div className="ml-auto flex flex-col items-end">
                                <button onClick={() => eliminarProducto(producto.id)}>
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <p className="text-black font-semibold text-lg">${(producto.precio * producto.cantidad).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen del pedido */}
                {carrito.length > 0 && (
                    <div className="w-full max-w-xs bg-gray-50 p-6 rounded-md shadow-sm border">
                        <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Envío</span>
                            <span>{envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between font-bold text-black mt-4 mb-6">
                            <span>Total del pedido</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-[#345769] hover:bg-[#1f3e52] text-white py-2 rounded-md text-sm font-medium">
                            Pago
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
