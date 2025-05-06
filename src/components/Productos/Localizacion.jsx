import { FaLocationDot } from 'react-icons/fa6';

export function Localizacion({ ubicacion, radio, onOpenModal }) {
  return (
    <a
      onClick={onOpenModal}
      className="flex items-center gap-2 text-sm font-semibold cursor-pointer text-[#3a6ead] hover:text-blue-600 transition-colors duration-200"
    >
      <FaLocationDot className="text-[#345769]" />

      {ubicacion?.nombre ? (
        <span className="hover:underline">
          {ubicacion.nombre} · {radio} km
        </span>
      ) : (
        <div className="h-4 w-4 border-2 border-[#345769] border-t-transparent rounded-full animate-spin"></div>
      )}
    </a>
  );
}