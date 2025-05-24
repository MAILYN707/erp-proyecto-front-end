import { Trash2 } from 'lucide-react';

export function ProductoCarrito({ producto, onUpdate, onDelete }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
      <img src={producto.imagen} alt="producto" className="w-32 h-32 object-cover rounded-md" />
      <div className="flex flex-col text-sm text-gray-700 w-full">
        <p className="font-semibold text-black">{producto.nombre}</p>
        <p>{producto.genero}</p>
        <p>Descripción: {producto.descripcion}</p>
        <p>Categoría: {producto.categoria}</p>
        <p>Proveedor: {producto.proveedor}</p>
        <div className="flex items-center gap-3 mt-2">
          <span>Cant</span>
          <button className="border px-2 rounded" onClick={() => onUpdate(producto.id, -1)}>-</button>
          <span>{producto.cantidad}</span>
          <button className="border px-2 rounded" onClick={() => onUpdate(producto.id, 1)}>+</button>
        </div>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <button onClick={() => onDelete(producto.id)}>
          <Trash2 className="w-5 h-5" />
        </button>
        <p className="text-black font-semibold text-lg">₡{(producto.precio * producto.cantidad).toFixed(2)}</p>
      </div>
    </div>
  );
}
