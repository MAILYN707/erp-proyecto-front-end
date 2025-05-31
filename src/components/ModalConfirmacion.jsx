import { useNavigate } from 'react-router-dom';

export function ModalConfirmacion({ visible, onClose }) {
    if (!visible) return null;
    const navigate = useNavigate();
    const irAIniciarSesion = () => {
        onClose();           // opcional si querés cerrar antes
        navigate('/authenticate');
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-[90%] max-w-md shadow-lg text-center animate-fade-in">
                <h2 className="text-xl font-bold text-[#345769] mb-2">¡Registro exitoso!</h2>
                <p className="text-gray-700 mb-4">
                    Tu empresa ha sido registrada correctamente y está en proceso de aprobación por parte del equipo de SupplyNet.
                </p>
                <p className="text-sm text-gray-500 mb-6">Te enviaremos un correo cuando la empresa haya sido aprobada.</p>

                <button
                    onClick={irAIniciarSesion}
                    className="inline-block w-full bg-[#345769] hover:bg-[#2a475f] text-white py-2 rounded-md font-semibold"
                >
                    Ir a iniciar sesión
                </button>

                <button onClick={onClose} className="mt-3 text-sm text-gray-500 hover:underline">
                    Cerrar
                </button>
            </div>
        </div>
    );
}
