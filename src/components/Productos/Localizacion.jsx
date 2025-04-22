import { FaLocationDot } from 'react-icons/fa6';

export function LabelLocalizacion() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
      <FaLocationDot className="text-[#345769]" />
      <span>Alajuela 72km</span>
    </div>
  );
}
