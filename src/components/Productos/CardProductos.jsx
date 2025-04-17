export function CardProductos({ producto }) {
    return (
      <div className="border rounded shadow-sm overflow-hidden hover:shadow-md transition">
        <img src={producto.img} alt={producto.nombre} className="w-full object-cover" />
      </div>
    );
  }
  