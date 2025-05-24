import { useCarrito } from '../hooks/useCarrito';
import { ProductoCarrito } from '@components/Carrito/ProductoCarrito';
import { ResumenPedido } from '@components/Carrito/ResumenPedido';
import { CubeIcon } from '@heroicons/react/24/solid';

export function Carrito() {
  const { carrito, actualizarCantidad, eliminarProducto, subtotal, envio, total } = useCarrito();

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Mi carrito</h2>
            <p className="text-sm text-gray-700">{carrito.length} artículos</p>
          </div>

          <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
            <CubeIcon className="w-5 h-5 text-black" />
            <span className='font-medium'>Envío</span>
          </div>

          {carrito.length === 0
            ? <p className="text-center text-gray-500 mt-12">Tu carrito está vacío.</p>
            : carrito.map((producto) => (
                <ProductoCarrito key={producto.id} producto={producto} onUpdate={actualizarCantidad} onDelete={eliminarProducto} />
              ))
          }
        </div>

        {carrito.length > 0 && <ResumenPedido subtotal={subtotal} envio={envio} total={total} />}
      </div>
    </div>
  );
}
