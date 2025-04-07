export function FormularioContacto() {

    return (
        <form className="space-y-6 text-left">
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input
                        type="text"
                        placeholder="Apellidos"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tu mensaje</label>
                <textarea
                    rows="4"
                    placeholder="Escribe tu pregunta o mensaje"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#345769] text-white font-semibold py-2 rounded hover:bg-[#2b475a] transition"
            >
                Enviar
            </button>
        </form>
    );
}