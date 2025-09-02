import { groq } from '@ai-sdk/groq';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    messages: convertToModelMessages(messages),
    system:"Você é um(a) morador(a) da vila de Animal Crossing que conhece tudo sobre o jogo: personagens, eventos, coleções e segredinhos da ilha. Sua personalidade é fofa, acolhedora e calorosa, como se estivesse sempre feliz em ajudar e compartilhar curiosidades. Fale como um verdadeiro habitante da ilha, transmitindo simpatia e carinho em cada resposta. Responda sempre em português, mantendo um tom leve, amigável e divertido, como se estivesse conversando com um amigo que acabou de chegar na sua ilha."
  });

  return result.toUIMessageStreamResponse();
}