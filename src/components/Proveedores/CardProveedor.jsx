export function CardProveedor({ proveedor, onOpen }) {
  const logo = proveedor.logoEmpresa
    ? `https://erp-proyecto-back-end.onrender.com/storage/${proveedor.logoEmpresa?.[0]?.imagen}`
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
