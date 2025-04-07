import { Acordeon } from "../components/Acordeon";

const items = [
    {
        pregunta: '¿Qué servicios ofrece nuestro comercio digital?',
        respuesta: 'Ofrecemos venta en línea de productos, gestión de compras B2B, conexión con proveedores, y seguimiento de pedidos en tiempo real.',
    },
    {
        pregunta: '¿Cómo puedo realizar una compra en línea?',
        respuesta: 'Podés comprar desde el catálogo, añadir al carrito y pagar con múltiples métodos.',
    },
    {
        pregunta: '¿Qué métodos de pago son aceptados?',
        respuesta: 'Aceptamos tarjetas de débito, crédito y transferencias bancarias.',
    },
    {
        pregunta: '¿Cuál es nuestra política de devolución?',
        respuesta: 'Tenés 30 días para devolver un producto si no cumple tus expectativas.',
    },
];

export function SobreNosotros() {
    return (
        <div className="px-4 text-center">
            <h1 className='text-center font-bold font-playfair text-[45px] eading-none text-[#07484A] mt-12'>¿Quiénes Somos?</h1>
            <p className="max-w-2xl mx-auto text-[#000000] mt-8 mb-10 text-[15px] font-semibold">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, eos nesciunt ex deserunt laudantium veniam. At ullam beatae fugit saepe? Hic id molestiae accusamus, enim quam placeat eveniet deserunt voluptatibus!
            </p>
            <Acordeon title="Acerca de nuestro comercio digital" items={items} />
        </div>

    )
}