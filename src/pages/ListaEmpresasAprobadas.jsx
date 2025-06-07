import React, { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient';
import { Spinner } from '@components/Spinner';

export function ListaEmpresasAprobadas() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalEmpresa, setModalEmpresa] = useState(null);
  const [accionEnProceso, setAccionEnProceso] = useState(false);

  const obtenerEmpresas = async () => {
    try {
      const response = await axiosClient.get('/empresas');
      const aprobadas = response.data.data.filter(emp => emp.estado === 'Aprobada');
      setEmpresas(aprobadas);
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

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="mx-auto px-4 py-12">
      <h1 className="text-center font-bold text-[35px] text-[#07484A] mb-10">
        Lista de Empresas Aprobadas
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
                <td className="px-4 py-2">
                  <button
                    onClick={() => abrirDetalles(empresa.id_empresa)}
                    className="bg-[#B0B7BD] hover:bg-[#A0AAB3] text-white px-4 py-1 rounded-full font-medium transition"
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {accionEnProceso && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-[#D6EAF8] text-[#345769] px-6 py-4 rounded-lg shadow-lg font-semibold">
            Procesando, por favor espere...
          </div>
        </div>
      )}

      {modalEmpresa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white text-[#345769] p-6 rounded-lg max-w-3xl w-full overflow-y-auto max-h-[90vh] shadow-lg">
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
            <div className="flex justify-end mt-6">
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
