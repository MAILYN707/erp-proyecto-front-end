import { axiosClient } from './axiosClient'; // Asegúrate que esté disponible

const CARRITO_KEY = 'carrito';

export const carritoService = {
  obtener: () => JSON.parse(localStorage.getItem(CARRITO_KEY)) || [],

  agregar: (producto, cantidad = 1) => {
    const carrito = carritoService.obtener();

    const index = carrito.findIndex(p => p.id === producto.id_producto);
    if (index >= 0) {
      carrito[index].cantidad += cantidad;
    } else {
      carrito.push({
        id: producto.id_producto,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio),
        cantidad,
        imagen: producto.imagenes?.[0]?.url || '/images/placeholder.jpg',
        proveedor: producto.empresa?.nombre || 'Sin nombre'
      });
    }

    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    window.dispatchEvent(new Event('carritoActualizado'));
  },

  guardarEnBackend: async () => {
    const carrito = carritoService.obtener();

    if (carrito.length === 0) return;

    const productos = carrito.map(p => ({
      id_producto: p.id,
      cantidad: p.cantidad
    }));

    try {
      await axiosClient.post('/carrito', { productos });
      console.log('🛒 Carrito guardado en backend');
    } catch (error) {
      console.error('Error al guardar carrito en backend:', error);
    }
  },

  eliminarDelBackend: async () => {
    try {
      const response = await axiosClient.delete('/carrito');
      console.log('🗑️ Carrito eliminado del backend:', response.data);
    } catch (error) {
      console.error('Error al eliminar carrito del backend:', error);
    }
  }
};
