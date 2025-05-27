import React, { useState } from 'react';
import { axiosClient } from '@services/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ModalConfirmacion } from '@components/ModalConfirmacion';

export function FormRegistro() {
  const [form, setForm] = useState({
    cedula_juridica: '',
    nombre: '',
    correo: '',
    tipo: '',
    telefono: '',
    provincia: '',
    canton: '',
    distrito: '',
    descripcion: ''
  });

  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [errores, setErrores] = useState({});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post('/empresas', {
        cedula_juridica: form.cedula_juridica,
        nombre: form.nombre,
        correo: form.correo,
        tipo: form.tipo,
        telefono: form.telefono,
        provincia: form.provincia,
        canton: form.canton,
        distrito: form.distrito,
        descripcion: form.descripcion,
        ubicacionProvincia: form.provincia,
        ubicacionCanton: form.canton,
        ubicacionDistrito: form.distrito
      });

      toast.success('Empresa registrada con éxito');
      setModalAbierto(true);


      // Limpia el formulario
      setForm({
        cedula_juridica: '',
        nombre: '',
        correo: '',
        tipo: '',
        telefono: '',
        provincia: '',
        canton: '',
        distrito: '',
        descripcion: ''
      });
    } catch (error) {
      const erroresBack = error.response?.data?.errors;

      if (erroresBack) {
        setErrores(erroresBack); // ← guarda los errores por campo
      } else {
        setErrores({});
        toast.error('Hubo un error al registrar la empresa');
      }
    }
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4">

      <input name="cedula_juridica" type="text" placeholder="Cédula jurídica" className="w-full border rounded px-3 py-2" onChange={handleChange} required />
      {errores.cedula_juridica && (
        <p className="text-red-500 text-sm">{errores.cedula_juridica[0]}</p>
      )}
      <input name="nombre" type="text" placeholder="Nombre de Empresa" className="w-full border rounded px-3 py-2" onChange={handleChange} required/>
      {errores.nombre && (
        <p className="text-red-500 text-sm">{errores.nombre[0]}</p>
      )}
      <input name="correo" type="email" placeholder="Correo de Empresa" className="w-full border rounded px-3 py-2" onChange={handleChange}/>
      {errores.correo && (
        <p className="text-red-500 text-sm">{errores.correo[0]}</p>
      )}
      <select name="tipo" onChange={handleChange} className="w-full border rounded px-3 py-2" required>
        <option value="">Tipo de Empresa</option>
        <option value="Micro">Microempresa</option>
        <option value="Pequeña">Pequeña</option>
        <option value="Mediana">Mediana</option>
        <option value="Grande">Grande</option>
      </select>
      {errores.tipo && (
        <p className="text-red-500 text-sm">{errores.tipo[0]}</p>
      )}
      <input
        name="telefono"
        type="number"
        placeholder="Teléfono"
        className="w-full border rounded px-3 py-2"
        onChange={handleChange}
        required
      />
       {errores.telefono && (
        <p className="text-red-500 text-sm">{errores.telefono[0]}</p>
      )}

      <input name="provincia" type="text" placeholder="Provincia" className="w-full border rounded px-3 py-2" onChange={handleChange} required />
       {errores.provincia && (
        <p className="text-red-500 text-sm">{errores.provincia[0]}</p>
      )}

      <input name="canton" type="text" placeholder="Cantón" className="w-full border rounded px-3 py-2" onChange={handleChange} required/>
       {errores.canton && (
        <p className="text-red-500 text-sm">{errores.canton[0]}</p>
      )}

      <input name="distrito" type="text" placeholder="Distrito" className="w-full border rounded px-3 py-2" onChange={handleChange} required/>
       {errores.distrito && (
        <p className="text-red-500 text-sm">{errores.distrito[0]}</p>
      )}
      <textarea name="descripcion" placeholder="Descripción de Empresa" className="w-full border rounded px-3 py-2 resize-none" rows={3} onChange={handleChange} required></textarea>

      <button type="submit" className="w-full bg-[#345769] text-white py-2 rounded font-semibold hover:bg-[#2b475a]">
        Crear una cuenta
      </button>

      <ModalConfirmacion visible={modalAbierto} onClose={() => setModalAbierto(false)} />

    </form>

  );
}
