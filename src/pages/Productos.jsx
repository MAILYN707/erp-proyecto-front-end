import React, { useState, useEffect } from 'react';
import { SideBarCategorias } from '../components/SideBarCategorias'



export function Productos() {

    return (
        <div className='productos-container'>
            <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mt-12'>Productos</h1>
            <div className='ml-20 italic text-[#345769] font-bold'>
                <p>
                    Ubicación 12 Km
                </p>
            </div>
            <div className='flex justify-end mr-10'>
                <input type="text"
                placeholder='Buscar'
                className='text-white rounded border-2  text-white border-[#749DB1]'
                />
            </div>
            <div className="product-page ml-20">


                <SideBarCategorias

                />

                {/* Componente grid de productos */}
            </div>
        </div>

    )
}