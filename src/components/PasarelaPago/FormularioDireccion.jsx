export default function FormularioDireccion({ formData, setFormData }) {
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Dirección 1 *"
          className="w-full p-2 border rounded"
          value={formData.direccion}
          onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Número de teléfono *"
          className="w-full p-2 border rounded"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo electrónico *"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
    );
  }
  