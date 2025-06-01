import { useEffect, useState } from 'react';
import FormularioDireccion from '../components/PasarelaPago/FormularioDireccion';
import MetodoPagoTarjeta from '../components/PasarelaPago/MetodoPago';
import BotonPago from '../components/PasarelaPago/BotonPago';
import { carritoService } from '../services/carritoService';
import { useUser } from '../components/UserContext';
import { axiosClient } from '../services/axiosClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function PasarelaPago() {
  const [formData, setFormData] = useState({ direccion: '', telefono: '', email: '' });
  const [pagoData, setPagoData] = useState({ numero: '', expiracion: '', codigo: '' });
  const [carrito, setCarrito] = useState([]);
  const { usuario } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!usuario || !usuario.id_empresa) {
      toast.error('No se pudo identificar al usuario o su empresa');
      return;
    }

    if (!formData.direccion || !formData.telefono || !formData.email) {
      toast.warning('Por favor completa todos los campos de dirección');
      return;
    }


    try {
      const respuesta = await axiosClient.post(`/empresas/${usuario.id_empresa}/facturas`, {
        direccion_entrega: formData.direccion
      });

      toast.success('Factura generada con éxito');

      // Limpia el carrito local
      localStorage.removeItem('carrito');
      setCarrito([]);

      navigate('/productos');

    } catch (error) {
      console.error('Error al generar factura:', error);
      toast.error('Hubo un problema al procesar la factura');
    }
  };


  useEffect(() => {
    try {
      const datos = carritoService.obtener();
      setCarrito(datos);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-2">Dirección de envío</h2>
        <p className="text-sm text-gray-600 mb-4">Se requiere para cuestiones relacionadas con el envío</p>
        <FormularioDireccion formData={formData} setFormData={setFormData} />
      </section>

      {/* Productos del carrito */}
      <div className="mt-6">
        <h3 className="text-md font-bold mb-2">Productos seleccionados</h3>
        <div className="space-y-2">
          {carrito.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center gap-2">
                <img
                  src={`https://erp-proyecto-back-end.onrender.com/storage/${item.imagen}`}
                  alt={item.nombre}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.nombre}</p>
                  <p className="text-xs text-gray-500">Cant: {item.cantidad}</p>
                </div>
              </div>
              <p className="font-bold text-[#345769]">₡{item.precio.toLocaleString('es-CR')}</p>
            </div>
          ))}
          
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">Método de pago</h2>
        <MetodoPagoTarjeta pagoData={pagoData} setPagoData={setPagoData} />
      </section>

      <BotonPago onSubmit={handleSubmit} />
    </div>
  );
}
