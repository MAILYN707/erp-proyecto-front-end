import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { carritoService } from '@services/carritoService';
import { useUser } from '@components/UserContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function ModalProducto({ producto, onClose }) {
  const [cantidad, setCantidad] = useState(1);
  const imagenes = producto.imagenes || [];
  const [imagenIndex, setImagenIndex] = useState(0);

  const incrementar = () => setCantidad(c => c + 1);
  const decrementar = () => setCantidad(c => (c > 1 ? c - 1 : 1));

  const siguienteImagen = () => setImagenIndex(i => (i + 1) % imagenes.length);
  const anteriorImagen = () => setImagenIndex(i => (i - 1 + imagenes.length) % imagenes.length);

  const { usuario } = useUser();
  const navigate = useNavigate();

  const handleAgregar = () => {
    if (!usuario) {
      navigate('/authenticate');
      return;
    }

    carritoService.agregar({
      id_producto: producto.id_producto,
      cantidad
    })
      .then(() => {
        toast.success('Producto agregado al carrito');
        onClose();
      })
      .catch(() => toast.error('Error al agregar al carrito'));
  };
  
  const imagen = imagenes[imagenIndex]?.url
    ? `http://localhost:8000/storage/${imagenes[imagenIndex].url}`
    : '/images/placeholder.jpg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        {/* Barra superior personalizada */}
        <div className="absolute top-0 left-0 right-0 h-6 rounded-t-lg" style={{ backgroundColor: '#345769' }} />
        <button
          onClick={onClose}
          className="absolute top-[2px] right-[6px] text-black text-xl font-bold w-[26px] h-[26px] flex items-center justify-center hover:text-gray-700"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Lado izquierdo: Imagen + texto alineado a la izquierda */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="relative w-full h-[280px] border rounded flex justify-center items-center">
              <button
                onClick={anteriorImagen}
                className="absolute left-2 bg-white border rounded px-2 py-1 shadow text-gray-500"
              >
                ❮
              </button>
              <img src={imagen} alt="Producto" className="max-h-[260px] object-contain" />
              <button
                onClick={siguienteImagen}
                className="absolute right-2 bg-white border rounded px-2 py-1 shadow text-gray-500"
              >
                ❯
              </button>
            </div>

            <div className="mt-4 text-left px-2">
              <h2 className="text-lg font-bold text-[#07484A]">{producto.nombre}</h2>
              <p><strong>Categoría:</strong> {producto.categoria?.nombre || 'Sin categoría'}</p>
              <p><strong>Nombre Empresa:</strong> {producto.empresa?.nombre || 'Sin empresa'}</p>
              <p><strong>Descripción:</strong> {producto.descripcion || 'Sin descripción disponible.'}</p>
            </div>
          </div>

          {/* Lado derecho: precio + cantidad + carrito */}
          <div className="w-full md:w-1/3 flex flex-col justify-end">
            <div className="p-4 border rounded-lg">
              <p className="text-xl font-bold text-center mb-4">₡ {producto.precio.toLocaleString()}</p>
              <hr className="mb-4" />
              <div className="flex items-center justify-between mb-4">
                <button onClick={decrementar} className="px-3 py-1 border rounded">-</button>
                <span className="text-sm">Cantidad: {cantidad}</span>
                <button onClick={incrementar} className="px-3 py-1 border rounded">+</button>
              </div>
              <button onClick={handleAgregar} className="flex items-center justify-center gap-2 w-full bg-[#07484A] text-white py-2 rounded hover:bg-[#066060] transition-colors">
                <ShoppingCart className="w-5 h-5" />
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}