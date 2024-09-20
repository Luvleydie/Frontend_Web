import { useState } from "react";

export default function Formulario() {
  const [respuesta, setRespuesta] = useState("");
  const [solucion, setSolucion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envía las respuestas del formulario al backend
    const res = await fetch("/api/interpretar-respuesta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ respuesta }),
    });

    const data = await res.json();
    setSolucion(data.solucion);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder="Ingresa tu respuesta aquí..."
        />
        <button type="submit">Enviar</button>
      </form>

      {solucion && (
        <div>
          <h3>Solución propuesta:</h3>
          <pre>{JSON.stringify(solucion, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
