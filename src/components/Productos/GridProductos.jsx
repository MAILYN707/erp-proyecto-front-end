import { CardProductos } from './CardProductos';
import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient'

export function GridProductos({ filtroBusqueda, categoriaSeleccionada, empresasCercanas }) {
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    axiosClient.get('/productos')
      .then(res => setProductos(res.data.data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  const productosFiltrados = productos.filter((p) => {
    // Filtrar por categoría, nombre y ubicación
    const coincideCategoria =
      categoriaSeleccionada === '' || p.id_categoriaProducto === categoriaSeleccionada;
    const coincideBusqueda =
      filtroBusqueda.trim() === '' || p.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase());

    const coincideUbicacion =
      !Array.isArray(empresasCercanas) || empresasCercanas.length === 0
        ? true
        : empresasCercanas.some(e => e.id_empresa === p.id_empresa);

    return coincideCategoria && coincideBusqueda && coincideUbicacion;
  });


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-8 ml-10">
      {productosFiltrados.map((producto) => (
        <CardProductos key={producto.id_producto} producto={producto} />
      ))}
    </div>

  );
}
