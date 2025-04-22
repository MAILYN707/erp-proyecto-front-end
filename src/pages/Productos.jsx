import React, { useEffect } from 'react';
import { LabelLocalizacion } from '../components/Productos/LabelLocalizacion';
import { Buscador } from '../components/Productos/Buscador';
import { SideBarCategorias } from '../components/Productos/SideBarCategorias';
import { GridProductos } from '../components/Productos/GridProductos';
import { axiosClient } from '../services/axiosClient';


export function Productos() {
    useEffect(() => {
        axiosClient.get('/productos')
            .then(res => console.log(res.data))
            .catch(err => console.error('Error al obtener productos:', err));
    }, []);

    return (
        <div className="mx-auto px-4 py-12 text-center">
            <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mb-10'>Productos</h1>
            <div className="p-6 ml-20">
                <div className="flex justify-between items-center mb-8">
                    <LabelLocalizacion />
                    <Buscador />
                </div>
                <div className="flex gap-6">
                    <SideBarCategorias />

                    <div className="flex-1">
                        <GridProductos />
                    </div>
                </div>
            </div>
        </div>


    )
}