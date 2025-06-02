export function CardProductos({ producto }) {
  const imagen =
    producto.imagenes?.[0]?.url ??
    `https://erp-proyecto-back-end.onrender.com/storage/${producto.imagenes?.[0]?.imagen}` ??
    '/images/placeholder.jpg';

  return (
    <div className="card-producto-css" onClick={() => console.log('Ver más')}>
      <img src={imagen} alt={producto.nombre} className="card-img-css" />
      <div className="card-overlay-css">
        <p className="card-nombre-css">{producto.nombre}</p>
        <button className="btn-ver-mas-css">Ver más</button>
      </div>
    </div>
  );
}