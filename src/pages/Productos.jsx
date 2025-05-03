import React, { useState, useEffect } from 'react';
import { Localizacion } from '../components/Productos/Localizacion';
import { Buscador } from '../components/Buscador';
import { SideBarCategorias } from '../components/Productos/SideBarCategorias';
import { GridProductos } from '../components/Productos/GridProductos';
<<<<<<< Updated upstream
=======
import { useUbicacion } from '../hooks/useUbicacion';
import { ModalUbicacion } from '../components/Productos/ModalUbicacion';
import ModalProductos from '../components/Productos/ModalProductos';


>>>>>>> Stashed changes
import { useUbicacion } from '../hooks/useUbicacion';
import { ModalUbicacion } from '../components/Productos/ModalUbicacion';


export function Productos() {

    const [filtroBusqueda, setFiltroBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
<<<<<<< Updated upstream

=======
    const [modalAbierto, setModalAbierto] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);


    const {
        ubicacion,
        setUbicacion,
        radio,
        setRadio,
        empresasCercanas,
    } = useUbicacion();


    const handleCambiarUbicacion = ({ ubicacion, radio }) => {
        setUbicacion(ubicacion);
        setRadio(radio);
        setModalAbierto(false);
    };

    const abrirModalProducto = (producto) => {
        setProductoSeleccionado(producto);
        setModalAbierto(true);
    };
>>>>>>> Stashed changes    const [modalAbierto, setModalAbierto] = useState(false);

    const {
        ubicacion,
        setUbicacion,
        radio,
        setRadio,
        empresasCercanas,
    } = useUbicacion();


    const handleCambiarUbicacion = ({ ubicacion, radio }) => {
        setUbicacion(ubicacion);
        setRadio(radio);
        setModalAbierto(false);
    };


    return (
        <div className="mx-auto px-4 py-12 text-center">
            <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mb-10'>Productos</h1>
            <div className="p-6 ml-20">
                <div className="flex justify-between items-center mb-8">
                    <Localizacion
                        ubicacion={ubicacion}
                        radio={radio}
                        onOpenModal={() => setModalAbierto(true)}
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
<<<<<<< Updated upstream
=======
                            empresasCercanas={empresasCercanas}
                            onProductoClick={abrirModalProducto}
>>>>>>> Stashed changes
                            empresasCercanas={empresasCercanas}
                        />

                    </div>
                </div>
<<<<<<< Updated upstream
=======

                {productoSeleccionado && modalAbierto && (
                    <ModalProductos
                        producto={productoSeleccionado}
                        onClose={() => {
                            setModalAbierto(false);
                            setProductoSeleccionado(null);
                        }}
                    />
                )}
>>>>>>> Stashed changes

                {modalAbierto && (
                    <ModalUbicacion
                        radio={radio}
                        ubicacion={ubicacion}
                        onUbicacionChange={handleCambiarUbicacion}
                        onClose={() => setModalAbierto(false)}
                    />
                )}
            </div>
        </div>


    )
}