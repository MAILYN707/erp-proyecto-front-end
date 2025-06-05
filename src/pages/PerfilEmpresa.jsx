import { useState, useEffect } from 'react';
import { axiosClient } from '@services/axiosClient';
import { useUser } from '@components/UserContext';
import { toast } from 'react-hot-toast';
import { PaperClipIcon } from '@heroicons/react/24/solid';
import { Spinner } from '@components/Spinner';


export function PerfilEmpresa() {
    const { usuario, setUsuario } = useUser();
    const [logo, setLogo] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState(null);
    const [subiendo, setSubiendo] = useState(false);
    const [guardado, setGuardado] = useState(false);
    const [cargandoLogo, setCargandoLogo] = useState(true);
   


    useEffect(() => {
        const cargarLogo = async () => {
            if (usuario?.id_empresa) {
                try {
                    const res = await axiosClient.get(`/empresas/${usuario.id_empresa}`);
                    const logo = res.data.data.logoEmpresa;
                    if (logo) {
                        setVistaPrevia(`https://erp-proyecto-back-end.onrender.com/${logo}`);
                    }
                } catch (error) {
                    console.error('Error al cargar el logo de empresa:', error);
                } finally {
                    setCargandoLogo(false);
                }
            } else {
                setCargandoLogo(false);
            }
        };

        cargarLogo();
    }, [usuario]);



    const handleFileChange = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            setLogo(archivo);
            setVistaPrevia(URL.createObjectURL(archivo));
            setGuardado(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!logo) {
            toast.error('Selecciona un archivo de imagen');
            return;
        }

        const formData = new FormData();
        formData.append('logoEmpresa', logo);

        try {
            setSubiendo(true);

            // PATCH para actualizar el logo en el backend
            await axiosClient.post(`/empresas/${usuario.id_empresa}?_method=PATCH`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            //Aquí actualizamos el contexto global y la vista previa
            const me = await axiosClient.get('/me');
            setUsuario(me.data.data);
            setVistaPrevia(`https://erp-proyecto-back-end.onrender.com/${me.data.data.logoEmpresa}`);

            toast.success('Logo actualizado correctamente');
            setLogo(null);
            setGuardado(true);

        } catch (error) {
            toast.error('Error al subir el logo');
            console.error(error);
        } finally {
            setSubiendo(false);
        }


    };

    if (cargandoLogo) {
        return <Spinner mensaje="Cargando perfil..." />;
    }

    return (
        <div className="mt-5 max-w-3xl mx-auto py-12 px-6 bg-white">
            <h1 className='text-center font-bold font-playfair text-[35px] leading-none text-[#07484A] mb-10'>Perfil de empresa</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <div className="relative flex flex-col items-center justify-center gap-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 relative">
                          
                            {/* Imagen o placeholder */}
                            {vistaPrevia ? (
                                <img
                                    src={vistaPrevia}
                                    alt=""
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No hay logo
                                </div>
                            )}
                        </div>



                        <label htmlFor="logo" className="cursor-pointer inline-flex items-center gap-2 text-[#345769] hover:text-[#2a475f] font-medium">
                            <PaperClipIcon className="w-5 h-5" />
                            Cambiar imagen
                            <input
                                id="logo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>


                    </div>
                </div>

                <button
                    type="submit"
                    disabled={subiendo}
                    className="w-full bg-[#345769] hover:bg-[#2a475f] text-white font-semibold py-2 rounded"
                >
                    {subiendo ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </form>
        </div>
    );
}