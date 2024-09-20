import { useState } from "react";
import axios from 'axios'
export default function Formulario() {
    const[question, setQuestion] = useState("");
    const[answer, setAnswer] = useState("");
    async function generateAnswer(){
        setAnswer("Cargando...")
        const response = await axios({
            url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBXpMHvDDds12XKlteMg36hr-RbXm4OXqw",
            method:"post",
            data:{
                contents:[
                    {parts:[{
                        "text":question}]}]}
        });
        setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
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
