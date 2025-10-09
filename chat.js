import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({

  apiKey: process.env.GOOGLE_API_KEY
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.json({ reply: "Erro ao processar a mensagem." });
  }
});

app.listen(3000, () => console.log('Backend rodando na porta 3000'));