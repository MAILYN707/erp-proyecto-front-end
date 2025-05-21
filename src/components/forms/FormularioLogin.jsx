import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export function FormLogin() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ correo: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credenciales);
    try {
      await login(credenciales);
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas o usuario no encontrado.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={credenciales.correo}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Contraseña"
          value={credenciales.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 pr-10"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <label>
          <input type="checkbox" className="mr-1" />
          Recordarme
        </label>
        <a href="#" className="text-[#345769] hover:underline">Olvidé mi contraseña</a>
      </div>

      <button type="submit" className="w-full bg-[#345769] text-white py-2 rounded font-semibold hover:bg-[#2b475a]">
        Iniciar sesión
      </button>
    </form>
  );
}
