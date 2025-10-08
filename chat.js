const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "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",
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Mensagem vazia" });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Erro ao processar resposta da IA" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
