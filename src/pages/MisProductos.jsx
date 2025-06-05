import { useEffect, useState } from "react";
import { axiosClient } from "@services/axiosClient";
import { useUser } from "@components/UserContext";
import { Spinner } from "@components/Spinner";

export function MisProductos() {
    const { usuario } = useUser();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const resProductos = await axiosClient.get('/productos');
                const resCategorias = await axiosClient.get('/categorias-producto');

                const todos = resProductos.data.data;
                const propios = todos.filter(p => p.id_empresa === usuario.id_empresa);

                setProductos(propios);
                setCategorias(resCategorias.data.data);
            } catch (error) {
                console.error("Error al obtener productos o categorías:", error);
            } finally {
                setCargando(false);
            }
        };

        if (usuario?.id_empresa) {
            obtenerProductos();
        }
    }, [usuario]);

    if (cargando) {
        return <Spinner mensaje="Cargando productos..." />;
    }

    const obtenerNombreCategoria = (idCategoria) => {
        const categoria = categorias.find(cat => cat.id_categoriaProducto === idCategoria);
        return categoria ? categoria.nombre : "Sin categoría";
    };

    return (
        <div className="p-8">
           
              <h1 className='text-center font-bold font-playfair text-[45px] leading-none text-[#07484A] mb-10'>Mis productos</h1>

                <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                    <table className="min-w-full table-auto text-center">
                        <thead className="bg-[#788CA6] text-black font-playfair">
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Nombre Producto</th>
                                <th className="px-4 py-2">Categoría</th>
                                <th className="px-4 py-2">Precio</th>
                                <th className="px-4 py-2">Disponible</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 bg-[#F6F6F6]">
                            {productos.map((producto) => (
                                <tr key={producto.id_producto} className="border-b hover:bg-gray-100">
                                    <td className="py-2">{producto.id_producto}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{obtenerNombreCategoria(producto.id_categoriaProducto)}</td>
                                    <td>₡{parseInt(producto.precio).toLocaleString()}</td>
                                    <td>{producto.disponible ? "Sí" : "No"}</td>
                                    <td className="space-x-1">
                                        <button className="bg-[#64866D] hover:bg-green-700 text-white text-sm px-4 py-1 rounded font-medium">Editar</button>
                                        <button className="bg-[#B7BB65] hover:bg-yellow-500 text-white text-sm px-4 py-1 rounded font-medium">Detalles</button>
                                        <button className="bg-[#B54345] hover:bg-red-700 text-white text-sm px-4 py-1 rounded font-medium">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {productos.length === 0 && (
                        <p className="text-center text-gray-600 mt-4 mb-5">No hay productos registrados.</p>
                    )}
                </div>
            </div>
    );
}
