import { useEffect, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export function CampoImagenes({ imagenes, setImagenes }) {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (Array.isArray(imagenes)) {
            const nuevasPreviews = imagenes.map((img) => ({
                file: img,
                url: URL.createObjectURL(img),
            }));
            setPreviews(nuevasPreviews);
        }
    }, [imagenes]);

    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        // Agregar nuevas imágenes sin reemplazar las anteriores
        const nuevasImagenes = [...imagenes, ...files];
        setImagenes(nuevasImagenes);
    };

    const eliminarImagen = (index) => {
        const nuevasImagenes = imagenes.filter((_, i) => i !== index);
        setImagenes(nuevasImagenes);
    };

    return (
        <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Imágenes</label>
            <label className="relative block w-full cursor-pointer">
                <div className="flex items-center border rounded px-3 py-2 w-full">
                    <FaPaperclip className="absolute right-3 text-gray-600" />
                    <span className="text-gray-600">Seleccionar imágenes</span>
                </div>
                <input
                    type="file"
                    name="imagenes"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </label>

            {/* Vista previa de imágenes seleccionadas */}
            <div className="flex flex-wrap gap-3 mt-3">
                {previews.map((img, index) => (
                    <div key={index} className="relative">
                        <img
                            src={img.url}
                            alt={`preview-${index}`}
                            className="w-16 h-16 object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => eliminarImagen(index)}
                            className="absolute top-[-6px] right-[-6px] bg-gray-800 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                        >
                            <FaTimes className="text-[10px]" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
