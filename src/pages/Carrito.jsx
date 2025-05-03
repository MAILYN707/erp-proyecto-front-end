import { CubeIcon } from '@heroicons/react/24/solid';
import { Trash2 } from 'lucide-react';

export function Carrito() {
    const producto = {
        nombre: "530",
        genero: "Unisex",
        color: "White con Natural Indigo",
        talla: "H4 / M5.5",
        proveedor: "New Balance",
        precio: 99.99,
        cantidad: 1,
        imagen: "/ruta/zapato.jpg",
        envio: 9.95,
    };

    const subtotal = producto.precio * producto.cantidad;
    const total = subtotal + producto.envio;



    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col lg:flex-row gap-8">
                {/* Info del producto */}
                <div className="flex-1">
                    <h2 className="text-lg font-medium mb-4">Mi carrito</h2>
                    <p className='flex justify-end'>
                        cantidad total de articulos del carrito
                    </p>

                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                        <CubeIcon className="w-5 h-10 text-black" />
                        <span className='font-medium'>Envío</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img src={producto.imagen} alt="producto" className="w-32 h-32 object-cover rounded-md" />
                        <div className="flex flex-col text-sm text-gray-700 w-full">
                            <p className="font-semibold text-black">{producto.nombre}</p>
                            <p>{producto.genero}</p>
                            <p>Color: {producto.color}</p>
                            <p>Talla: {producto.talla}</p>
                            <p>Proveedor: {producto.proveedor}</p>
                            <div className="flex items-center gap-3 mt-2">
                                <span>Cant</span>
                                <button className="border px-2 rounded">-</button>
                                <span>{producto.cantidad}</span>
                                <button className="border px-2 rounded">+</button>
                            </div>
                        </div>

                        <div className="ml-auto flex flex-col items-end">
                            <button>
                                <Trash2 className="w-5 h-5" />
                            </button>
                            <p className="text-black font-semibold text-lg">${producto.precio.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Resumen del pedido */}
                <div className="w-full max-w-xs bg-gray-50 p-6 rounded-md shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>
                    <div className="flex justify-between mb-2 text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm">
                        <span>Envío</span>
                        <span>${producto.envio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-black mt-4 mb-6">
                        <span>Total del pedido</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-[#345769] hover:bg-[#1f3e52] text-white py-2 rounded-md text-sm font-medium">
                        Pago
                    </button>
                </div>
            </div>
        </div>
    );
}
