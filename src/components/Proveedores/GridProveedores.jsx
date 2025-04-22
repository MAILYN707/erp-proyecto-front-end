import { useEffect, useState } from 'react';
import { axiosClient } from '../../services/axiosClient';
import { CardProveedor } from './CardProveedor';
import { ModalProveedor } from './ModalProveedor';

export function GridProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  useEffect(() => {
    axiosClient.get('/empresas')
      .then(res => setProveedores(res.data.data))
      .catch(err => console.error('Error al obtener proveedores:', err));
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {proveedores.map((prov) => (
          <CardProveedor
            key={prov.id_empresa}
            proveedor={prov}
            onOpen={setProveedorSeleccionado}
          />
        ))}
      </div>

        {/* Modal */}
        {proveedorSeleccionado && (
        <ModalProveedor
          proveedor={proveedorSeleccionado}
          onClose={() => setProveedorSeleccionado(null)}
        />
      )}
    </div>

  );
}
