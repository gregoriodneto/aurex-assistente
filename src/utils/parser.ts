import OpenAI from "openai";
import dotenv from "dotenv";
import * as chrono from "chrono-node"

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function ajustarFormatoHorario(texto: string): string {
  return texto
    .replace(/às (\d{1,2})h(?!\d)/gi, 'às $1:00')
    .replace(/(da manhã|da tarde|da noite)/gi, '');
}

function extrairNome(texto: string): string | null {
  const regex = /\b(?:com|para|de)\s+([A-ZÁÉÍÓÚÃÕÂÊÔa-záéíóúãõâêôç]+(?:\s+(?:da|de|do|dos|das)?\s*[A-Z][a-z]+){0,3})/;
  const match = texto.match(regex);
  return match ? match[1].trim() : null;
}

export const parser = (comando: string) => {
    const textModifier = ajustarFormatoHorario(comando);
    const results = chrono.pt.parse(textModifier);

    const nome = extrairNome(comando);
    const data = results[0]?.date?.();

    if (!data && !nome) {
        console.log("Nenhuma data ou nome encontrado.");
        return null;
    }

    return {
        nome: nome || null,
        date: data ? data.toISOString() : null
    }
}

/**
 * Parse em caso de usar OpenAi
 * Lembrando que é necessário de crédito para utilizar. * 
 */
export const parserOpenAi = async (comando: string) => {
    const completion = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `Me dê em um JSON o nome e a data do comando: ${comando}`
            }
        ] 
    });
    return completion.choices[0].message.content;
}