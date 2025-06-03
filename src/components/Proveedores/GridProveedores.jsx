import { CardProveedor } from './CardProveedor';
import { ModalProveedor } from './ModalProveedor';
import { useState } from 'react';

export function GridProveedores({ filtroBusqueda, proveedores }) {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  const proveedoresFiltrados = proveedores.filter(p =>
    p.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 justify-items-center">
        {proveedoresFiltrados.map((prov) => (
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
