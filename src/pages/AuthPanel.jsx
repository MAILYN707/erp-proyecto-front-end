import React, { useState } from 'react';
import { FormLogin } from '../components/forms/FormularioLogin';
import { FormRegistro } from '../components/forms/FormularioRegistro';


export function AuthPanel() {
    const [activeForm, setActiveForm] = useState('login');

    return (
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start py-10 bg-gray-100 min-h-screen px-4">

            <div className="bg-white rounded-xl border shadow border-[#345769] p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-center mt-4">
                    {activeForm === 'login' ? 'Inicia sesión' : '¡Regístrate ya!'}
                </h2>
                <p className='text-center mt-2'>
                    {activeForm === 'login' ? 'Ingresa con tu cuenta SupplyNet.' : 'Sé parte de SupplyNet.'}
                </p>

                <div className="flex border-b mt-8 mb-4">
                    <button
                        className={`w-1/2 py-2 font-semibold ${activeForm === 'login' ? 'border-b-4 border-[#345769]' : 'text-gray-500'}`}
                        onClick={() => setActiveForm('login')}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        className={`w-1/2 py-2 font-semibold ${activeForm === 'registro' ? 'border-b-4 border-[#345769]' : 'text-gray-500'}`}
                        onClick={() => setActiveForm('registro')}
                    >
                        Crear una cuenta
                    </button>
                </div>

                {activeForm === 'login' ? <FormLogin /> : <FormRegistro />}
            </div>
        </div>
    );
}