import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

export function Acordeon({ title, items }) {

    const [openIndex, setOpenIndex] = useState(0); //Para abrir el primero por defecto
  
    const toggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="max-w-xl mx-auto border-2 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-slate-700">{title}</h2>
  
        {items.map((item, index) => (
          <div key={index} className="mb-2 border rounded overflow-hidden shadow-sm">
            <button
              className={`w-full px-4 py-3 flex justify-between items-center text-left font-semibold ${
                openIndex === index ? 'bg-[#345769] text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => toggle(index)}
            >
              {item.pregunta}
              {openIndex === index ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
  
            {openIndex === index && (
              <div className="px-4 py-2 bg-gray-50 text-sm text-gray-700">
                {item.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  
 