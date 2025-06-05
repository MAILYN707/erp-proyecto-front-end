import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import {
  FiShoppingBag,
  FiClipboard,
  FiPackage,
  FiTruck,
  FiBox,
  FiCheckCircle
} from "react-icons/fi";

const estados = [
  "Pedido",
  "En proceso",
  "Enviado",
  "En Entrega",
  "Listo para ser recogido",
  "Entregado"
];

const iconos = [
  FiShoppingBag,
  FiClipboard,
  FiPackage,
  FiTruck,
  FiBox,
  FiCheckCircle
];

export function BarraSeguimiento({ estadoActual }) {
  const pasoActual = estados.findIndex(
    (e) => e.toLowerCase() === estadoActual?.toLowerCase()
  );
  const progreso = (pasoActual / (estados.length - 1)) * 100;

  return (
    <div className="w-full p-6 bg-white rounded-md shadow">
      {/* Barra de progreso */}
      <ProgressBar percent={progreso} filledBackground="#07484A">
        {estados.map((estado, i) => (
          <Step key={estado}>
            {({ accomplished }) => (
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                ${accomplished ? "bg-[#07484A] text-white" : "bg-gray-300 text-gray-700"}`}
              >
                <FiCheckCircle className="w-3 h-3" />
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>

      
      <div className="flex justify-between mt-6 px-[4px]">
        {estados.map((estado, i) => {
          const Icono = iconos[i];
          return (
            <div key={estado} className="flex flex-col items-center text-center w-2">
              <Icono className="w-5 h-5 text-black mb-1" />
              <span className="text-xs font-semibold">{estado}</span>
            </div>
          );
        })}
      </div>

      {estadoActual?.toLowerCase() === "entregado" && (
        <div className="mt-6 text-green-600 text-sm font-semibold text-center">
          ✔ Pedido entregado con éxito
        </div>
      )}
    </div>
  );
}
