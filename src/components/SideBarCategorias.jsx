import React from 'react';

export function SideBarCategorias({ categorias, categoriaSeleccionada, onSelect }) {
  return (
    <aside className="category-sidebar">
      <button className="category-title">Categorías</button>
      <ul className="category-list">
        {/* {categorias.map((cat, index) => (
          <li
            key={index}
            className={`category-item ${categoriaSeleccionada === cat ? 'active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </li>
        ))} */}
      </ul>
    </aside>
  );
}
