const categorias = [
  'Belleza', 'Calzado', 'Hogar', 'Línea Blanca',
  'Mascotas', 'Moda', 'Tecnología'
];

export function SideBarCategorias() {
  return (
    <aside className="w-48">
      <button className="w-full mb-4 bg-[#345769] text-white py-2 rounded font-semibold">
        Categorías
      </button>
      <ul className="space-y-2 text-[#345769] font-medium">
        {categorias.map((cat, i) => (
          <li key={i} className="cursor-pointer hover:text-blue-800">
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
