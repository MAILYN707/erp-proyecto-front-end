import React, { useState, useEffect } from 'react';
import { LabelLocalizacion } from '../components/Productos/LabelLocalizacion';
import { Buscador } from '../components/Productos/Buscador';
import { SideBarCategorias } from '../components/Productos/SideBarCategorias';
import { GridProductos } from '../components/Productos/GridProductos';



export function Productos() {

    return (
        <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <LabelLocalizacion />
        <Buscador />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 text-[#134f44]">Productos</h1>

      <div className="flex gap-6">
        <SideBarCategorias />

        <div className="flex-1">
          <GridProductos />
        </div>
      </div>
    </div>

    )
}