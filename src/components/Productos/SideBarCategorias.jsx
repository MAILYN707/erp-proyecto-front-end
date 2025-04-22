import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient'

export function SideBarCategorias({ categoriaSeleccionada, onSelect }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axiosClient.get('/categorias-producto')
      .then(res => {
        if (res.data && Array.isArray(res.data.data)) {
          // Agregamos "Todos" al inicio del array
          setCategorias([{ id_categoriaProducto: '', nombre: 'Todos' }, ...res.data.data]);
        } else {
          console.warn('Respuesta inesperada de la API:', res.data);
        }
      })
      .catch(err => console.error('Error al obtener categorías', err));
  }, []);

  return (
    <aside className="w-48 h-[500px] overflow-y-auto scrollbar-custom pr-3">
      <div className="w-full mb-4 bg-[#345769] text-center text-white py-2 rounded font-semibold">
        Categorías
      </div>
      <ul className="space-y-[1.9rem] text-[#345769] font-medium mt-10">
        {categorias.map((cat) => (
          <li
            key={cat.id_categoriaProducto ?? 'todos'}
            onClick={() => onSelect(cat.id_categoriaProducto)}
            className={`cursor-pointer text-start ml-5 hover:text-blue-800 transition-colors ${
              categoriaSeleccionada === cat.id_categoriaProducto ? 'font-bold' : ''
            }`}
          >
            {cat.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}