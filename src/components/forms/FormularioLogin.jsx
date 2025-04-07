import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function FormLogin() {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="space-y-4">
      <input type="email" placeholder="Correo electrónico" className="w-full border rounded px-3 py-2" />

      <div className="relative">
        <input type="password" placeholder="Contraseña" className="w-full border rounded px-3 py-2 pr-10" />
         <span
          onClick={togglePassword}
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
