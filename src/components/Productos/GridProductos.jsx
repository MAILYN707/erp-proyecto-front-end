import { CardProductos } from './CardProductos';
import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient'

export function GridProductos() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/productos')
      .then(res => {
        if (res.data && Array.isArray(res.data.data)) {
          setProductos(res.data.data);
        } else {
          console.warn('Formato inesperado de productos:', res.data);
        }
      })
      .catch(err => console.error('Error al obtener productos:', err))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-8">
      {productos.map((p) => (
        <CardProductos key={p.id_producto} producto={p} />
      ))}
    </div>

  );
}
