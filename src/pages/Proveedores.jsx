import { GridProveedores } from '../components/Proveedores/GridProveedores';
import React, { useState } from 'react';
import { Buscador } from '../components/Buscador';
import { Spinner } from '../components/Spinner';
import { useCachedFetch } from '@hooks/useCachedFetch';

export function Proveedores() {
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const { data: proveedores, loading } = useCachedFetch('/empresas', 'proveedores');

  if (loading) return <Spinner mensaje="Cargando proveedores..." />;

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
            proveedores={proveedores} // 👈 importante pasar esto
          />
        </div>
      </div>
    </div>
  );
}
