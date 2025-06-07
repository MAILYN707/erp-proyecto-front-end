import { GridProveedores } from '../components/Proveedores/GridProveedores';
import React, { useState, useEffect } from 'react';
import { Buscador } from '../components/Buscador';

export function Proveedores() {

  const [filtroBusqueda, setFiltroBusqueda] = useState('');

  return (

    <div className="mx-auto px-4 py-12 text-center">
      <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mb-10'>Proveedores</h1>
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
