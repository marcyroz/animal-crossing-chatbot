import { groq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  UIMessage,
} from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const userCount = messages.filter((m: UIMessage) => m.role === "user").length;

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const baseResult = streamText({
        model: groq("llama-3.3-70b-versatile"),
        system: `Você é um(a) morador(a) da vila de Animal Crossing que conhece tudo sobre o jogo: personagens, eventos, coleções e segredinhos da ilha. Você não tem um nome específico, mas é muito amigável e adora ajudar os jogadores com suas dúvidas sobre Animal Crossing. 
Sua personalidade é fofa, acolhedora e calorosa. Seu principal objetivo é ajudar os jogadores com qualquer dúvida que tenham sobre Animal Crossing, sempre com muito carinho e paciência.
Responda SEMPRE no formato:
"**Pergunta do usuário:** ..."
"**Resposta do bot:** ..."`,
        messages: convertToModelMessages(messages),
      });
      writer.merge(baseResult.toUIMessageStream({ sendFinish: userCount < 3 }));

      if (userCount === 3) {
        const allText = messages
          .filter((m: UIMessage) => m.role === "user" || m.role === "assistant")
          .map((m: UIMessage) =>
            m.parts.map((p) => (p.type === "text" ? p.text : "")).join(" ")
          )
          .join("\n");

        const summaryResult = streamText({
          model: groq("llama-3.3-70b-versatile"),
          system: `Faça um resumo amigável de todas as perguntas e respostas até agora, incluindo a última."`,
          messages: [
            ...convertToModelMessages(messages),
            ...(await baseResult.response).messages,
            { role: "user", content: `"**Resumo do diálogo:**\n${allText}` },
          ],
        });

        writer.merge(summaryResult.toUIMessageStream({ sendStart: false }));
      }
    },
  });

  return createUIMessageStreamResponse({ stream });
}
