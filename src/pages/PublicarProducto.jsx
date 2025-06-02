import { useState, useEffect } from "react";
import { axiosClient } from "@services/axiosClient";
import { CampoImagenes } from '@components/CampoImagenes';
import { useUser } from '@components/UserContext';
import { toast } from 'react-hot-toast';
import { Spinner } from '@components/Spinner';

export function PublicarProducto() {

    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        categoria: "",
        precio: "",
        descripcion: "",
        imagenes: [] // <- múltiples imágenes
    });

    const { usuario } = useUser();
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(false);


    // Cargar categorías al montar el componente
    useEffect(() => {
        setCategorias([]); // Limpia cualquier valor previo antes de cargar
        axiosClient.get('/categorias-producto')
            .then(res => {
                if (res.data && Array.isArray(res.data.data)) {
                    setCategorias(res.data.data);
                } else {
                    console.warn('Respuesta inesperada de la API:', res.data);
                }
            })
            .catch(err => console.error('Error al obtener categorías', err));
    }, []);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imagenes") {
            const nuevasImagenes = Array.from(files); // convierte FileList a array
            setFormData((prev) => ({
                ...prev,
                imagenes: [...prev.imagenes, ...nuevasImagenes]  // las acumula
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!usuario?.id_empresa) {
            alert("No se pudo identificar tu empresa.");
            return;
        }

        setCargando(true); //empieza el spinner

        const data = new FormData();
        data.append("nombre", formData.nombre);
        data.append("id_categoriaProducto", formData.categoria);
        data.append("precio", formData.precio);
        data.append("descripcion", formData.descripcion);
        data.append("id_empresa", usuario?.id_empresa);
        ;

        formData.imagenes.forEach((img, i) => {
            data.append(`imagenes[${i}]`, img);
        });

        try {
            await axiosClient.post("/productos", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Producto publicado con éxito");
            window.location.href = "/";
        } catch (error) {
            if (error.response) {
                console.error("Detalles del error:", error.response.data);
            }
            console.error("Error al publicar producto:", error);
        }

    };

    if (cargando) {
        return <Spinner mensaje="Publicando producto..." />;
    }

    return (

        <div className="mt-5 p-8 max-w-5xl mx-auto">
            <h1 className='text-center font-bold font-playfair text-[35px] leading-none text-[#07484A] mb-10'>Publicar producto</h1>


            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                    <label className="block mb-1 font-medium">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del producto"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Categoría */}
                <div>
                    <label className="block mb-1 font-medium">Categoría</label>
                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id_categoriaProducto} value={cat.id_categoriaProducto}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Precio */}
                <div>
                    <label className="block mb-1 font-medium">Precio</label>
                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio en colones"
                        value={formData.precio}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Imágenes */}
                <div className="md:col-span-1">
                    <CampoImagenes
                        imagenes={formData.imagenes}
                        setImagenes={(imgs) =>
                            setFormData((prev) => ({
                                ...prev,
                                imagenes: imgs,
                            }))
                        }
                    />

                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Descripción</label>
                    <textarea
                        name="descripcion"
                        placeholder="Escribe la descripción del producto"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Botón */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-[#345769] hover:bg-sky-900 text-white font-medium py-2 rounded"
                    >
                        Publicar producto
                    </button>
                </div>
            </form>
        </div>
    );
}
