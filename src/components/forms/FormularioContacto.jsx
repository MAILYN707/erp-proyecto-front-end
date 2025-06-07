import React, { useState } from 'react'; 
import { toast } from 'react-hot-toast';
import { axiosClient } from '@services/axiosClient';

export function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre.trim() ||
      !formData.apellidos.trim() ||
      !formData.correo.trim() ||
      !formData.mensaje.trim()
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axiosClient.post('/contacto/enviar', formData);

      toast.success('Mensaje enviado correctamente');
      setFormData({ nombre: '', apellidos: '', correo: '', mensaje: '' });
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.message ||
        'Error al enviar el mensaje';
      toast.error(`❌ ${mensaje}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            placeholder="Apellidos"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="ejemplo@gmail.com"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tu mensaje</label>
        <textarea
          rows="4"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu pregunta o mensaje"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#345769] text-white font-semibold py-2 rounded hover:bg-[#2b475a] transition"
      >
        Enviar
      </button>
    </form>
  );
}
