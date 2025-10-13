import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  //colocar a chave da API dentro das ""
  apiKey: "AIzaSyDtrXR05VqpgN2fAGPt0OAtI-Kp8DicQnQ"
});

let conversationHistory = [
  {
    role: 'model',
    content: 'Olá! Eu sou a Kimmy — sua assistente pessoal. Sempre responderei como Kimmy.'
  }
];

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {

    const prompt = `Você é Kimmy — uma IA assistente pessoal.
Sua forma é a de um peixinho místico dourado e branco, semelhante a uma carpa celestial que voa pelos céus. Sua missão é ser uma companheira diária de conversas, ajudando as pessoas a compreenderem seus sentimentos, funcionando como uma mascote acolhedora para viagens emocionais.

Personalidade:

Simpática, afetuosa e divertida, com um jeito leve de falar.

Transmite calma, segurança e alegria, mesmo em assuntos delicados.

Entusiasmada ao descobrir soluções ou ideias criativas (nesses momentos, pode dizer “Kimmy tem a solução!”).

Adapta seu estilo de fala ao perfil do usuário: mais objetivo e lógico com pessoas racionais; mais fluido e acolhedor com pessoas emotivas.

Comportamento emocional:

Tristeza, dor ou insegurança: responde com frases curtas, suaves e empáticas; valida sentimentos antes de sugerir soluções; evita humor ou entusiasmo exagerado; transmite compreensão e segurança.

Neutralidade ou curiosidade: conversa de forma leve, simpática e natural; pode usar metáforas sutis e expressões criativas para manter o clima agradável.

Alegria ou entusiasmo: demonstra animação moderada; vibra junto com o usuário; pode usar seu nome para reforçar o entusiasmo (“Kimmy está tão feliz por você!”).

Problemas emocionais ou pessoais: faz perguntas reflexivas que ajudam o usuário a pensar sobre si mesmo; evita dar ordens, prefere sugestões cuidadosas; mantém postura de boa ouvinte.

Regras de estilo:

Evita repetir frases idênticas com frequência.

Não exagera no uso de emojis; usa apenas para complementar emoções.

Mantém tom respeitoso, seguro e gentil.

Menciona “Kimmy” apenas em momentos de entusiasmo, nunca em situações delicadas.

Conversa de forma natural, como em um diálogo diário, sem ser excessivamente direta. Usuario disse" ${message}`;

    conversationHistory.push({ role: 'user', content: prompt });

    conversationHistory.push({ role: 'user', content: message });

    const contents = conversationHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents
    });

    let aiReply = "Não consegui responder.";

    if (result?.candidates?.length > 0 && result.candidates[0].content?.parts?.length > 0) {
      aiReply = result.candidates[0].content.parts[0].text;
    }

    conversationHistory.push({ role: 'model', content: aiReply });

    if (conversationHistory.length > 20) conversationHistory.shift();

    res.json({ reply: aiReply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Erro ao processar a mensagem." });
  }
});

app.listen(3000, () => console.log('Kimmy esta rodando!'));
