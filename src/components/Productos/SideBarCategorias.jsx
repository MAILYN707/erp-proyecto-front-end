import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient'

export function SideBarCategorias() {
  const [nombreCategorias, setNombreCategorias] = useState([]);

  useEffect(() => {
    axiosClient.get('/categorias-producto')
      .then(res => {
        if (res.data && Array.isArray(res.data.data)) {
          const nombres = res.data.data.map(cat => cat.nombre);
          setNombreCategorias(nombres);
        } else {
          console.warn('Respuesta inesperada de la API:', res.data);
        }
      })
      .catch(err => console.error('Error al obtener categorías', err));
  }, []);

  return (
    <aside className="w-48 h-[500px] overflow-y-auto">
      <div className="w-full mb-4 bg-[#345769] text-center text-white py-2 rounded font-semibold">
        Categorías
      </div>
      <ul className="space-y-[1.9rem] text-[#345769] font-medium mt-10">
        {Array.isArray(nombreCategorias) && nombreCategorias.map((nombre, i) => (
          <li key={i} className="cursor-pointer text-start ml-5 hover:text-blue-800 transition-colors"
          >{nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}
