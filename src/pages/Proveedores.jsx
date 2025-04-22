import { GridProveedores } from '../components/Proveedores/GridProveedores';


export function Proveedores() {
    return (
      <div className="flex flex-col items-center px-4 py-12">
        <h1 className="text-center font-bold font-playfair text-[45px] leading-none text-[#07484A] mb-10">
          Proveedores
        </h1>
  
        <div className="w-full flex justify-center">
          <GridProveedores />
        </div>
      </div>
    );
  }
