import { CardProductos } from './CardProductos';
import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient'

export function GridProductos({ filtroBusqueda, categoriaSeleccionada }) {
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    axiosClient.get('/productos')
      .then(res => setProductos(res.data.data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      categoriaSeleccionada === '' || p.id_categoriaProducto === categoriaSeleccionada;
    const coincideBusqueda =
      filtroBusqueda.trim() === '' || p.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase());
  
    return coincideCategoria && coincideBusqueda;
  });
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-8 ml-10">
      {productosFiltrados.map((producto) => (
        <CardProductos key={producto.id_producto} producto={producto} />
      ))}
    </div>

  );
}
