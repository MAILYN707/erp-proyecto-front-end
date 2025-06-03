import { useEffect, useState } from "react";
import axios from "axios";

export function Encargos() {
    const [encargos, setEncargos] = useState([]);

    useEffect(() => {
        const obtenerEncargos = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/api/mis-pedidos", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                
            } catch (error) {
                console.error("Error al cargar los encargos:", error);
            }
        };
        obtenerEncargos();
    }, []);

    const modificarEstado = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`/api/pedidos/${id}/estado`, { estado: "En proceso" }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Estado actualizado");
        } catch (error) {
            console.error("Error modificando estado:", error);
        }
    };

    const verDetalles = (id) => {
        window.location.href = `/encargos/${id}`;
    };

    return (
        <div className="p-8 ">
            <h1 className='text-center font-bold font-playfair text-[45px] leading-none text-[#07484A] mb-10'>Encargos recibidos</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#788CA6] text-black font-playfair ">
                        <tr>
                            <th className="px-4 py-3 text-left">Código</th>
                            <th className="px-4 py-3 text-left">Cliente</th>
                            <th className="px-4 py-3 text-left">Fecha</th>
                            <th className="px-4 py-3 text-left">Estado</th>
                            <th className="px-4 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {encargos.map((encargo) => (
                            <tr key={encargo.id} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-3">{encargo.id}</td>
                                <td className="px-4 py-3">{encargo.cliente?.nombre || '—'}</td>
                                <td className="px-4 py-3">{new Date(encargo.fecha).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{encargo.estado}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        onClick={() => modificarEstado(encargo.id)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Modificar estado
                                    </button>
                                    <button
                                        onClick={() => verDetalles(encargo.id)}
                                        className="bg-sky-700 hover:bg-sky-800 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Ver más
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {encargos.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                                    No hay encargos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
