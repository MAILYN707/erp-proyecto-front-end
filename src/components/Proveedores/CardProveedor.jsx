export function CardProveedor({ proveedor, onOpen }) {
  const logo = proveedor.logoEmpresa
    ? `http://localhost:8000/storage/${proveedor.logoEmpresa}`
    : '/images/placeholder.jpg';

  return (

    <div className="proveedor-card mt-14" onClick={() => onOpen(proveedor)}>
      <img src={logo} alt={proveedor.nombre} className="proveedor-imagen" />
      <div className="proveedor-overlay">
        <p className="proveedor-nombre">{proveedor.nombre}</p>
        <button className="btn-ver-mas" onClick={() => onOpen(proveedor)}>
          Ver más
        </button>
      </div>
    </div>

  );
}
