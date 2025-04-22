import React, { useState, useEffect } from 'react';
import { LabelLocalizacion } from '../components/Productos/Localizacion';
import { Buscador } from '../components/Buscador';
import { SideBarCategorias } from '../components/Productos/SideBarCategorias';
import { GridProductos } from '../components/Productos/GridProductos';


export function Productos() {

    const [filtroBusqueda, setFiltroBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    return (
        <div className="mx-auto px-4 py-12 text-center">
            <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mb-10'>Productos</h1>
            <div className="p-6 ml-20">
                <div className="flex justify-between items-center mb-8">
                    <LabelLocalizacion />
                    <Buscador
                        placeholder='Buscar productos...'
                        valor={filtroBusqueda}
                        onChange={setFiltroBusqueda}
                    />
                </div>
                <div className="flex gap-6">
                    <SideBarCategorias
                        categoriaSeleccionada={categoriaSeleccionada}
                        onSelect={setCategoriaSeleccionada}
                    />
                    <div className="flex-1">
                        <GridProductos
                            filtroBusqueda={filtroBusqueda}
                            categoriaSeleccionada={categoriaSeleccionada}
                        />
                    </div>
                </div>
            </div>
        </div>


    )
}