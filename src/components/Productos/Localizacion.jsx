import { FaLocationDot } from 'react-icons/fa6';

export function Localizacion({ ubicacion, radio, onOpenModal }) {
  return (
    <a onClick={onOpenModal} className="flex items-center gap-2 text-sm text-gray-700 font-semibold cursor-pointer">
      <FaLocationDot className="text-[#345769]" />
      <span>{ubicacion?.provincia || 'Detectando...'}</span>
      <span className="italic">{radio}km</span>
      
    </a>
  );
}