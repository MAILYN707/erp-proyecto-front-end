import { CardProductos } from './CardProductos';

// const productos = [
//   { id: 1, nombre: 'Paleta de maquillaje', img: '/img/paleta.jpg' },
//   { id: 2, nombre: 'Zapatos Nike', img: '/img/nike.jpg' },
//   { id: 3, nombre: 'Sofá', img: '/img/sofa.jpg' },
//   { id: 4, nombre: 'Cama para perro', img: '/img/perro.jpg' },
//   { id: 5, nombre: 'Blusa', img: '/img/blusa.jpg' },
//   { id: 6, nombre: 'Laptop', img: '/img/laptop.jpg' }
// ];

export function GridProductos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* {productos.map((p) => (
        <CardProducto key={p.id} producto={p} />
      ))} */}
    </div>
  );
}
