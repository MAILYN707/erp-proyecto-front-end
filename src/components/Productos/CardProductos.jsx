export function CardProductos({ producto }) {
  const imagen = producto.imagenes?.[0]?.url
  ? `http://localhost:8000/storage/${producto.imagenes[0].url}`
  : '/images/placeholder.jpg';

  return (
    <div className="card-producto bg-white rounded-xl overflow-hidden">
      <div className="w-full aspect-[1/0.3]">
        <img
          src={imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{producto.nombre}</h3>
        <p className="text-sm text-gray-600">{producto.descripcion}</p>
        <p className="mt-2 font-bold text-[#345769]">₡{producto.precio}</p>
      </div>
    </div>
  );
}
