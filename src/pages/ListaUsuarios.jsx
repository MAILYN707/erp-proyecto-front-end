import React, { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient';
import { Buscador } from '../components/Buscador';

export function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalUsuario, setModalUsuario] = useState(null);
    const [accionEnProceso, setAccionEnProceso] = useState(false);
    const [confirmarAccion, setConfirmarAccion] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    const obtenerUsuarios = async () => {
        try {
            const response = await axiosClient.get('/usuarios');
            setUsuarios(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los usuarios');
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const abrirDetalles = async (id) => {
        setAccionEnProceso(true);
        try {
            const response = await axiosClient.get(`/usuarios/${id}`);
            setModalUsuario(response.data.data);
        } catch (err) {
            console.error('Error al obtener detalles:', err);
        } finally {
            setAccionEnProceso(false);
        }
    };

    const eliminarUsuario = async (id_empresa) => {
        setAccionEnProceso(true);
        try {
            await axiosClient.delete(`/empresas/${id_empresa}`);
            setModalUsuario(null);
            obtenerUsuarios();
        } catch (err) {
            console.error('Error al eliminar usuario:', err);
        } finally {
            setAccionEnProceso(false);
            setConfirmarAccion(null);
        }
    };

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (loading) return <div className="text-center mt-10">Cargando usuarios...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="mx-auto px-4 py-12">
            <h1 className='text-center font-bold text-[35px] text-[#07484A] mb-10'>Lista de Usuarios</h1>

            <div className="flex justify-end mb-4">
                <Buscador
                    placeholder="Buscar por nombre"
                    valor={busqueda}
                    onChange={setBusqueda}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-[#3C6E71] text-white">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nombre de Usuario</th>
                            <th className="px-4 py-2">Correo</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map((usuario) => (
                            <tr key={usuario.id_usuario} className="text-center border-b">
                                <td className="px-4 py-2">{usuario.id_usuario}</td>
                                <td className="px-4 py-2">{usuario.nombre}</td>
                                <td className="px-4 py-2">{usuario.correo}</td>
                                <td className="px-4 py-2">{usuario.estado}</td>
                                <td className="px-4 py-2">{usuario.rol}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button onClick={() => abrirDetalles(usuario.id_usuario)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Detalles</button>
                                    <button onClick={() => setConfirmarAccion({ tipo: 'eliminar', id: usuario.id_empresa })} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {accionEnProceso && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white px-6 py-4 rounded-lg shadow-lg">Procesando, por favor espere...</div>
                </div>
            )}

            {confirmarAccion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Confirmación</h2>
                        <p className="mb-6">¿Estás seguro que deseas eliminar este usuario?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setConfirmarAccion(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                            <button
                                onClick={() => {
                                    setModalUsuario(null);
                                    eliminarUsuario(confirmarAccion.id);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalUsuario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
                    <div className="bg-white p-6 rounded-lg max-w-3xl w-full overflow-y-auto max-h-[90vh]">
                        <img
                            src="/src/assets/icons/SupplyNet-logo.svg"
                            alt="Logo Empresa"
                            className="h-16 mb-4 mx-auto"
                        />
                        <h2 className="text-xl font-bold mb-4 text-[#07484A]">Detalles del Usuario</h2>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <p><strong>Nombre:</strong> {modalUsuario.nombre}</p>
                            <p><strong>Correo:</strong> {modalUsuario.correo}</p>
                            <p><strong>Rol:</strong> {modalUsuario.rol}</p>
                            <p><strong>Estado:</strong> {modalUsuario.estado}</p>
                            <h2 className="text-xl font-bold mb-4 text-[#07484A]">Detalles de la empresa</h2>
                            <br />
                            <p><strong>Nombre de la Empresa:</strong> {modalUsuario.empresa?.nombre}</p>
                            <p><strong>Cédula Jurídica:</strong> {modalUsuario.empresa?.cedula_juridica}</p>
                            <p><strong>Tipo:</strong> {modalUsuario.empresa?.tipo}</p>
                            <p><strong>Descripción:</strong> {modalUsuario.empresa?.descripcion}</p>
                            <p><strong>Provincia:</strong> {modalUsuario.empresa?.ubicacionProvincia}</p>
                            <p><strong>Cantón:</strong> {modalUsuario.empresa?.ubicacionCanton}</p>
                            <p><strong>Distrito:</strong> {modalUsuario.empresa?.ubicacionDistrito}</p>
                            <p><strong>Teléfono:</strong> {modalUsuario.empresa?.telefono}</p>
                            <p><strong>Latitud:</strong> {modalUsuario.empresa?.latitud}</p>
                            <p><strong>Longitud:</strong> {modalUsuario.empresa?.longitud}</p>
                            <p><strong>Fecha de registro:</strong> {modalUsuario.empresa?.fecha_registro}</p>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setModalUsuario(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
