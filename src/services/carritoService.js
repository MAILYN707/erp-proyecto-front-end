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

    }
};
