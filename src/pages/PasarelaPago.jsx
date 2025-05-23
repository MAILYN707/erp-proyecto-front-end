import { useEffect, useState } from 'react';
import FormularioDireccion from '../components/PasarelaPago/FormularioDireccion';
import MetodoPagoTarjeta from '../components/PasarelaPago/MetodoPago';
import BotonPago from '../components/PasarelaPago//BotonPago';

export function PasarelaPago() {
  const [formData, setFormData] = useState({ direccion: '', telefono: '', email: '' });
  const [pagoData, setPagoData] = useState({ numero: '', expiracion: '', codigo: '' });

  const handleSubmit = () => {
    // Lógica para validar y enviar datos
    console.log('Enviar datos:', { formData, pagoData });
  };
  useEffect(() => {
    carritoService.obtener()
      .then(res => setCarrito(res.data))
      .catch(() => toast.error('No se pudo cargar el carrito'));
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
                  src={`http://localhost:8000/storage/${item.producto.imagen}`}
                  alt={item.producto.nombre}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.producto.nombre}</p>
                  <p className="text-xs text-gray-500">Cant: {item.cantidad}</p>
                </div>
              </div>
              <p className="font-bold text-[#345769]">₡{item.producto.precio}</p>
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
