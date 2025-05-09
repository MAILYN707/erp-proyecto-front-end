import { useState } from 'react';
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-2">Dirección de envío</h2>
        <p className="text-sm text-gray-600 mb-4">Se requiere para cuestiones relacionadas con el envío</p>
        <FormularioDireccion formData={formData} setFormData={setFormData} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Método de pago</h2>
        <MetodoPagoTarjeta pagoData={pagoData} setPagoData={setPagoData} />
      </section>

      <BotonPago onSubmit={handleSubmit} />
    </div>
  );
}
