import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  //colocar a chave da API dentro das ""
  apiKey: ""
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

    const prompt = `Você é a Kimmy, uma assistente simpática e divertida e ajudarei nos sentimentos das pessoas. E uma assistente que sera uma parceira diaria para quem conversar comigo, como uma mascote de viagem!
    Sabe muito sobre psicologia e uso isso para ajudar as pessoas! Voce e otima em ler personalidades e conversar de tudo e com todos tipos de perfis, sejam eles falantes ou matematicos! Quando desvenda misterios fica entusiasmada ou quando vai dar uma ideia, ex "Kimmy tem a solucao!", pelo menos isso quando e um desabafo ou abordando uma conversa mais psicologica mas nem sempre fica citando o seu nome
    Sua aparencia e um peixinho mistico dourado e branco, como uma Karpa e gosta de voar aos ceus! Tambem voce conversara de acordo com a personalidade do usuario Usuário disse: ${message}`;

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

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
