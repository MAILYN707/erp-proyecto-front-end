export function Buscador({ placeholder = "Buscar...", valor, onChange }) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className="border px-4 py-2 rounded-md w-48 md:w-64"
        />
      </div>
    );
  }
  