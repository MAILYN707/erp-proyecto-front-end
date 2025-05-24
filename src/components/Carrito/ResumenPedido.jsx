export function ResumenPedido({ subtotal, envio, total }) {
  return (
    <div className="w-full max-w-xs bg-gray-50 p-6 rounded-md shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>
      <div className="flex justify-between mb-2 text-sm">
        <span>Subtotal</span>
       <span>{`₡ ${subtotal.toLocaleString('es-CR')}`}</span>
      </div>
      <div className="flex justify-between mb-2 text-sm">
        <span>Envío</span>
       <span>{envio === 0 ? 'GRATIS' : `₡ ${envio.toLocaleString('es-CR')}`}</span>
      </div>
      <div className="flex justify-between font-bold text-black mt-4 mb-6">
        <span>Total del pedido</span>
        <span>₡ {total.toLocaleString('es-CR')}</span>
      </div>
      <button className="w-full bg-[#345769] hover:bg-[#1f3e52] text-white py-2 rounded-md text-sm font-medium">
        Pago
      </button>
    </div>
  );
}
