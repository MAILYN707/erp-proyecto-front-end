import React from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram
} from 'react-icons/fa';
import { FormularioContacto } from '../components/forms/FormularioContacto';

export function Contacto() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mb-10'>Contacto</h1>

      <div>
        <FormularioContacto/>
      </div>
     
     
    </div>
  );
}
