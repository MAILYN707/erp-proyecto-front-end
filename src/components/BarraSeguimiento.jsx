import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const estados = [
    "pedido",
    "en_proceso",
    "enviado",
    "en_entrega",
    "listo_para_recoger",
    "entregado"
  ];
  
  export function BarraSeguimiento({ estadoActual }) {
    const pasoActual = estados.indexOf(estadoActual);
    const progreso = (pasoActual / (estados.length - 1)) * 100;
  
    return (
      <div className="w-full p-6 bg-white rounded-md shadow">
        <ProgressBar percent={progreso} filledBackground="#07484A">
          {estados.map((estado, i) => (
            <Step key={estado}>
              {({ accomplished }) => (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center
                  ${accomplished ? "bg-[#07484A] text-white" : "bg-gray-300 text-gray-700"}`}>
                  ✓
                </div>
              )}
            </Step>
          ))}
        </ProgressBar>
  
        <div className="flex justify-between text-xs text-center mt-4">
          {estados.map((estado) => (
            <span key={estado} className="w-20">{estado.replaceAll('_', ' ')}</span>
          ))}
        </div>
      </div>
    );
  }