import { useEffect, useState } from "react";
import { axiosClient } from "@services/axiosClient";
import { ModalModificarEstado } from "@components/Encargos/ModalModificarEstado";
import { ModalDetalleEncargo } from "@components/Encargos/ModalDetalleEncargo";
import { Spinner } from "@components/Spinner";


export function Encargos() {
    const [encargos, setEncargos] = useState([]);
    const [encargoSeleccionado, setEncargoSeleccionado] = useState(null);
    const [modalEstadoAbierto, setModalEstadoAbierto] = useState(false);
    const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      
        const obtenerEncargos = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axiosClient.get("/pedidos-recibidos", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = response.data?.data || [];
                setEncargos(data);
            } catch (error) {
                console.error("Error al cargar los encargos:", error);
            } finally {
                setLoading(false);
            }
        };

       
        obtenerEncargos();
    }, []);

   
    const actualizarEstadoLocal = (idFactura, nuevoEstado) => {
        const actualizado = encargos.map(e => {
            if (e.id_factura === idFactura && e.pedidos?.length) {
                return {
                    ...e,
                    pedidos: [{ ...e.pedidos[0], estado: nuevoEstado }]
                };
            }
            return e;
        });

        setEncargos(actualizado);
        
    };


    if (loading) return <Spinner mensaje="Cargando encargos..." />;


    return (
        <div className="p-8">
            <h1 className='text-center font-bold font-playfair text-[45px] leading-none text-[#07484A] mb-10'>Encargos recibidos</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#788CA6] text-black font-playfair text-center">
                        <tr>
                            <th className="px-4 py-3 text-center">Código</th>
                            <th className="px-4 py-3 text-center">Fecha</th>
                            <th className="px-4 py-3 text-center">Cliente</th>
                            <th className="px-4 py-3 text-center">Estado</th>
                            <th className="px-4 py-3 text-center">Dirección</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-800 text-center bg-[#F6F6F6]">
                        {Array.isArray(encargos) && encargos.map((encargo) => {
                            const estadoActual = encargo.pedidos?.[0]?.estado;
                            const esEntregado = estadoActual === "Entregado";

                            return (
                                <tr key={encargo.id_factura}>
                                    <td className="px-4 py-3">{encargo.id_factura || '—'}</td>
                                    <td className="px-4 py-3">
                                        {encargo.fecha_emision ? new Date(encargo.fecha_emision).toLocaleDateString() : '—'}
                                    </td>
                                    <td className="px-4 py-3">{encargo.comprador?.nombre || '—'}</td>
                                    <td className={`px-4 py-3 ${esEntregado ? 'text-green-700 font-bold' : ''}`}>
                                        {estadoActual || '—'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {encargo.pedidos?.[0]?.direccion_entrega || '—'}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2 justify-center">
                                        {!esEntregado && (
                                            <button
                                                onClick={() => {
                                                    setEncargoSeleccionado(encargo);
                                                    setModalEstadoAbierto(true);
                                                }}
                                                className="bg-[#64866D] hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-bold"
                                            >
                                                Modificar estado
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                setEncargoSeleccionado(encargo);
                                                setModalDetalleAbierto(true);
                                            }}
                                            className="bg-[#B7BB65] hover:bg-[#93974a] text-white px-3 py-2 rounded text-sm font-bold"
                                        >
                                            Ver más
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {Array.isArray(encargos) && encargos.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                                    No hay encargos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {modalEstadoAbierto && (
                <ModalModificarEstado
                    encargo={encargoSeleccionado}
                    onClose={() => setModalEstadoAbierto(false)}
                    onEstadoActualizado={actualizarEstadoLocal}
                />
            )}

            {modalDetalleAbierto && (
                <ModalDetalleEncargo
                    encargo={encargoSeleccionado}
                    onClose={() => setModalDetalleAbierto(false)}
                />
            )}
        </div>
    );
}
