import { useEffect, useState } from 'react';

export function useCarrito() {
  const [carrito, setCarrito] = useState([]);

  const cargarCarrito = () => {
    const datos = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(datos);
  };

  useEffect(() => {
    // Cargar al iniciar
    cargarCarrito();

    // Escuchar cambios emitidos desde carritoService
    window.addEventListener('carritoActualizado', cargarCarrito);

    // Limpieza
    return () => {
      window.removeEventListener('carritoActualizado', cargarCarrito);
    };
  }, []);

  const actualizarCantidad = (id, cambio) => {
    const actualizado = carrito.map(p =>
      p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad + cambio) } : p
    );
    setCarrito(actualizado);
    localStorage.setItem('carrito', JSON.stringify(actualizado));
    window.dispatchEvent(new Event('carritoActualizado'));
  };

  const eliminarProducto = (id) => {
    const nuevo = carrito.filter(p => p.id !== id);
    setCarrito(nuevo);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
    window.dispatchEvent(new Event('carritoActualizado'));
  };

  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const envio = subtotal >= 200 ? 0 : 9.95;
  const total = subtotal + envio;

  return { carrito, actualizarCantidad, eliminarProducto, subtotal, envio, total };
}
