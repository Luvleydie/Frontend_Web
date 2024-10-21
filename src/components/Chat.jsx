import { useState } from "react";
import axios from 'axios'
export default function Formulario() {
    const[question, setQuestion] = useState("");
    const[answer, setAnswer] = useState("");
    async function generateAnswer(e) {
        e.preventDefault(); // Prevenir recarga de la página

        setAnswer("Cargando...");
        
        try {
            const response = await axios.post("http://localhost:3000/generate-answer", { question });
            setAnswer(response.data.answer);
        } catch (error) {
            setAnswer("Error al generar respuesta");
            console.error(error);
        }
    }
  return (
    <div>
        <h1>Chat</h1>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} cols='30' rows='10'></textarea>
        <button onClick={generateAnswer}>Generador de respuesta</button>
        <pre>{answer}</pre>
    </div>
  );
}
