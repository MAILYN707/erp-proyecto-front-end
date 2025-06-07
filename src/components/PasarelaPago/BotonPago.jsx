export default function BotonPago({ onSubmit }) {
  return (
    <button
      onClick={onSubmit}
      className="w-full bg-[#345769] text-white py-3 rounded font-semibold"
    >
      Continuar con el Pago
    </button>
  );
}
  