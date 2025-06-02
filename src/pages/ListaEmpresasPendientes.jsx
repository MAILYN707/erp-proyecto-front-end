import React, { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient';
import { Spinner } from '@components/Spinner';

export function ListaEmpresasPendientes() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalEmpresa, setModalEmpresa] = useState(null);
  const [accionEnProceso, setAccionEnProceso] = useState(false);
  const [confirmarAccion, setConfirmarAccion] = useState(null);

  const obtenerEmpresas = async () => {
    try {
      const response = await axiosClient.get('/empresas');
      const pendientes = response.data.data.filter(emp => emp.estado === 'Pendiente');
      setEmpresas(pendientes);
    } catch (err) {
      setError('Error al cargar las empresas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  const abrirDetalles = async (id) => {
    setAccionEnProceso(true);
    try {
      const response = await axiosClient.get(`/empresas/${id}`);
      setModalEmpresa(response.data.data);
    } catch (err) {
      console.error('Error al obtener detalles:', err);
    } finally {
      setAccionEnProceso(false);
    }
  };

  const aceptarEmpresa = async (id) => {
    setAccionEnProceso(true);
    try {
      await axiosClient.patch(`/empresas/${id}/estado`, { estado: 'Aprobada' });
      setModalEmpresa(null);
      obtenerEmpresas();
    } catch (err) {
      console.error('Error al aceptar empresa:', err);
    } finally {
      setAccionEnProceso(false);
      setConfirmarAccion(null);
    }
  };

  const rechazarEmpresa = async (id) => {
    setAccionEnProceso(true);
    try {
      await axiosClient.delete(`/empresas/${id}`);
      setModalEmpresa(null);
      obtenerEmpresas();
    } catch (err) {
      console.error('Error al eliminar empresa:', err);
    } finally {
      setAccionEnProceso(false);
      setConfirmarAccion(null);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="mx-auto px-4 py-12">
      <h1 className="text-center font-bold text-[35px] text-[#07484A] mb-10">
        Lista de Empresas Pendientes
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-[#3C6E71] text-white">
            <tr>
              <th className="px-4 py-2">Nombre de empresa</th>
              <th className="px-4 py-2">Cédula Jurídica</th>
              <th className="px-4 py-2">Tipo empresa</th>
              <th className="px-4 py-2">Fecha registro</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id_empresa} className="text-center border-b">
                <td className="px-4 py-2">{empresa.nombre}</td>
                <td className="px-4 py-2">{empresa.cedula_juridica}</td>
                <td className="px-4 py-2">{empresa.tipo}</td>
                <td className="px-4 py-2">{empresa.fecha_registro}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setConfirmarAccion({ tipo: 'aceptar', id: empresa.id_empresa })}
                    className="bg-[#5BA1A1] hover:bg-[#4B8C8C] text-white px-3 py-1 rounded"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => abrirDetalles(empresa.id_empresa)}
                    className="bg-[#B0B7BD] hover:bg-[#A0AAB3] text-white px-3 py-1 rounded"
                  >
                    Detalles
                  </button>
                  <button
                    onClick={() => setConfirmarAccion({ tipo: 'rechazar', id: empresa.id_empresa })}
                    className="bg-[#B84040] hover:bg-[#A53232] text-white px-3 py-1 rounded"
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {accionEnProceso && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-[#D5E8F3] text-[#345769] px-6 py-4 rounded-lg shadow-lg font-semibold">
            Procesando, por favor espere...
          </div>
        </div>
      )}

      {confirmarAccion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Confirmación</h2>
            <p className="mb-6">
              ¿Estás seguro que deseas{' '}
              {confirmarAccion.tipo === 'aceptar' ? 'aprobar' : 'rechazar'} esta empresa?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmarAccion(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setModalEmpresa(null);
                  if (confirmarAccion.tipo === 'aceptar') aceptarEmpresa(confirmarAccion.id);
                  if (confirmarAccion.tipo === 'rechazar') rechazarEmpresa(confirmarAccion.id);
                }}
                className={`px-4 py-2 rounded text-white ${
                  confirmarAccion.tipo === 'aceptar'
                    ? 'bg-[#5BA1A1] hover:bg-[#4B8C8C]'
                    : 'bg-[#B84040] hover:bg-[#A53232]'
                }`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEmpresa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white text-[#345769] p-6 rounded-lg max-w-3xl w-full overflow-y-auto max-h-[90vh] shadow-xl">
            <img
              src="/src/assets/icons/SupplyNet-logo.svg"
              alt="Logo Empresa"
              className="h-16 mb-4 mx-auto"
            />
            <h2 className="text-xl font-bold mb-4 text-[#07484A]">Detalles de Empresa</h2>
            <div className="grid grid-cols-2 gap-4 text-left text-black">
              <p><strong>Nombre:</strong> {modalEmpresa.nombre}</p>
              <p><strong>Cédula Jurídica:</strong> {modalEmpresa.cedula_juridica}</p>
              <p><strong>Correo:</strong> {modalEmpresa.correo}</p>
              <p><strong>Tipo:</strong> {modalEmpresa.tipo}</p>
              <p><strong>Descripción:</strong> {modalEmpresa.descripcion}</p>
              <p><strong>Provincia:</strong> {modalEmpresa.ubicacionProvincia}</p>
              <p><strong>Cantón:</strong> {modalEmpresa.ubicacionCanton}</p>
              <p><strong>Distrito:</strong> {modalEmpresa.ubicacionDistrito}</p>
              <p><strong>Teléfono:</strong> {modalEmpresa.telefono}</p>
              <p><strong>Latitud:</strong> {modalEmpresa.latitud}</p>
              <p><strong>Longitud:</strong> {modalEmpresa.longitud}</p>
              <p><strong>Fecha registro:</strong> {modalEmpresa.fecha_registro}</p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setConfirmarAccion({ tipo: 'aceptar', id: modalEmpresa.id_empresa })}
                className="bg-[#5BA1A1] hover:bg-[#4B8C8C] text-white px-4 py-2 rounded"
              >
                Aceptar
              </button>
              <button
                onClick={() => setConfirmarAccion({ tipo: 'rechazar', id: modalEmpresa.id_empresa })}
                className="bg-[#B84040] hover:bg-[#A53232] text-white px-4 py-2 rounded"
              >
                Rechazar
              </button>
              <button
                onClick={() => setModalEmpresa(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
