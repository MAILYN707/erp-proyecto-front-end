import React, { useState, useEffect } from 'react';
import { Localizacion } from '../components/Productos/Localizacion';
import { Buscador } from '../components/Buscador';
import { SideBarCategorias } from '../components/Productos/SideBarCategorias';
import { GridProductos } from '../components/Productos/GridProductos';
import { useUbicacion } from '../hooks/useUbicacion';
import { ModalUbicacion } from '../components/Productos/ModalUbicacion';
import ModalProductos from '../components/Productos/ModalProductos';
import { axiosClient } from '@services/axiosClient'


export function Productos() {

    const [filtroBusqueda, setFiltroBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [productosPorUbicacion, setProductosPorUbicacion] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);


    const {
        ubicacion,
        setUbicacion,
        radio,
        setRadio,
        empresasCercanas,
    } = useUbicacion();


    const handleCambiarUbicacion = async ({ ubicacion, radio }) => {
        setUbicacion(ubicacion);
        setRadio(radio);
        setModalAbierto(false);

        try {
            const res = await axiosClient.get(`/productos/ubicacion/${ubicacion.nombre}`);
            const productos = res.data.data;

            if (Array.isArray(productos) && productos.length === 0) {
                setProductosPorUbicacion([]); // ← actualiza con lista vacía
            } else {
                setProductosPorUbicacion(productos);
            }
        } catch (error) {
            console.error('Error al obtener productos por ubicación:', error);
            setProductosPorUbicacion(null); // en caso de error
        }
    };

    const abrirModalProducto = (producto) => {
        setProductoSeleccionado(producto);
        setModalAbierto('producto');
    };



    return (
        <div className="mx-auto px-4 py-12 text-center">
            <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mb-10'>Productos</h1>
            <div className="p-6 ml-20">
                <div className="flex justify-between items-center mb-8">
                    <Localizacion
                        ubicacion={ubicacion}
                        radio={radio}
                        onOpenModal={() => setModalAbierto('ubicacion')}
                    />

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
                            empresasCercanas={empresasCercanas}
                            onProductoClick={abrirModalProducto}
                            productosPorUbicacion={productosPorUbicacion}
                        />


                    </div>
                </div>

                {modalAbierto === 'ubicacion' && (
                    <ModalUbicacion
                        radio={radio}
                        ubicacion={ubicacion}
                        empresasCercanas={empresasCercanas}
                        onUbicacionChange={handleCambiarUbicacion}
                        onClose={() => setModalAbierto(null)}
                    />
                )}

                {modalAbierto === 'producto' && productoSeleccionado && (
                    <ModalProductos
                        producto={productoSeleccionado}
                        onClose={() => {
                            setModalAbierto(null);
                            setProductoSeleccionado(null);
                        }}
                    />
                )}
            </div>
        </div>

    )
}