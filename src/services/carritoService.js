import { axiosClient } from '../services/axiosClient';

export const carritoService = {
  obtener: () => axiosClient.get('/carrito'),
  agregar: (producto) => axiosClient.post('/carrito', producto),
  eliminar: (idCarrito) => axiosClient.delete(`/carrito/${idCarrito}`),
  vaciar: () => axiosClient.delete('/carrito'),
};
