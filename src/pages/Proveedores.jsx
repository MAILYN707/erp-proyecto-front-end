import { GridProveedores } from '../components/Proveedores/GridProveedores';
import React, { useState, useEffect } from 'react';
import { Buscador } from '../components/Buscador';
import { Spinner } from '../components/Spinner'; // ✅ Import del spinner

export function Proveedores() {
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [loading, setLoading] = useState(true); // ✅ Estado de carga

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setLoading(false);
    }, 2000); // Ajustá si querés que dure más o menos
    return () => clearTimeout(temporizador);
  }, []);

  if (loading) return <Spinner />; // ✅ Mostrar spinner mientras carga

  return (
    <div className="mx-auto px-4 py-12 text-center">
      <h1 className='text-center font-bold font-playfair text-[45px] leading-none text-[#07484A] mb-10'>Proveedores</h1>
      <div className="p-6 ml-20">
        <div className="w-full flex justify-end items-center mb-8">
          <Buscador
            placeholder='Buscar proveedores...'
            valor={filtroBusqueda}
            onChange={setFiltroBusqueda}
          />
        </div>
        <div className="w-full flex justify-center">
          <GridProveedores
            filtroBusqueda={filtroBusqueda}
          />
        </div>
      </div>
    </div>
  );
}
