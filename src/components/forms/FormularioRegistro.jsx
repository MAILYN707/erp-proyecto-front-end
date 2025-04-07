import React from 'react';

export function FormRegistro() {
  return (
    <form className="space-y-4">
      <input type="text" placeholder="Cédula jurídica" className="w-full border rounded px-3 py-2" />
      <input type="text" placeholder="Nombre de Empresa" className="w-full border rounded px-3 py-2" />
      <input type="email" placeholder="Correo de Empresa" className="w-full border rounded px-3 py-2" />
      
      <select className="w-full border rounded px-3 py-2">
        <option>Tipo de Empresa</option>
        <option>Microempresa</option>
        <option>Pyme</option>
        <option>Grande</option>
      </select>

      <input type="text" placeholder="Provincia" className="w-full border rounded px-3 py-2" />
      <input type="text" placeholder="Cantón" className="w-full border rounded px-3 py-2" />
      <input type="text" placeholder="Distrito" className="w-full border rounded px-3 py-2" />
      <textarea placeholder="Descripción de Empresa" className="w-full border rounded px-3 py-2 resize-none" rows={3}></textarea>

      <button type="submit" className="w-full bg-[#345769] text-white py-2 rounded font-semibold hover:bg-[#2b475a]">
        Crear una cuenta
      </button>
    </form>
  );
}
