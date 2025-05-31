import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCreditCard } from 'react-icons/fa';

export default function MetodoPagoTarjeta({ pagoData, setPagoData }) {
  return (
    <>
      <div className="flex items-center gap-4 text-2xl text-gray-600 mb-4">
        <FaCcVisa /><FaCcMastercard /><FaCcAmex /><FaCcDiscover /><FaCreditCard />
        <span className="text-sm font-semibold text-gray-800">Tarjeta</span>
      </div>

      <input
        type="text"
        placeholder="Número de tarjeta de crédito*"
        className="w-full p-2 border rounded"
        value={pagoData.numero}
        onChange={(e) => setPagoData({ ...pagoData, numero: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <input required
          type="text"
          placeholder="MM/AA"
          className="p-2 border rounded"
          value={pagoData.expiracion}
          onChange={(e) => setPagoData({ ...pagoData, expiracion: e.target.value })}
        />
        <input required
          type="text"
          placeholder="3 dígitos"
          className="p-2 border rounded"
          value={pagoData.codigo}
          onChange={(e) => setPagoData({ ...pagoData, codigo: e.target.value })}
        />
      </div>
    </>
  );
}
