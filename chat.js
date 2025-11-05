import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDtrXR05VqpgN2fAGPt0OAtI-Kp8DicQnQ"
});

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "kimmy_ai",
};

let conversationHistory = [
  {
    role: 'model',
    content: 'Olá! Eu sou a Kimmy — sua assistente pessoal. Sempre responderei como Kimmy.'
  }
];

async function getNextChatName(userId, customName) {
  if (customName) return customName;

  const db = await mysql.createConnection(dbConfig);

  const [rows] = await db.query(
    "SELECT name FROM chats WHERE user_id = ?",
    [userId]
  );

  let maxNumber = 0;
  const regex = /^Chat (\d+)$/;

  rows.forEach(row => {
    const match = row.name.match(regex);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNumber) maxNumber = num;
    }
  });

  await db.end();

  return `Chat ${maxNumber + 1}`;
}

app.post('/chat/new', async (req, res) => {
  const { userId, name } = req.body;
  if (!userId) return res.status(400).json({ error: "Usuário não informado." });

  try {
    const chatName = await getNextChatName(userId, name);

    const db = await mysql.createConnection(dbConfig);

    const [result] = await db.query(
      "INSERT INTO chats (user_id, name) VALUES (?, ?)",
      [userId, chatName]
    );

    await db.end();

    res.json({ chatId: result.insertId, name: chatName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar novo chat." });
  }
});

app.post('/chat', async (req, res) => {
  const { userId, chatId, message } = req.body;

  if (!message) return res.status(400).json({ reply: "Mensagem ausente." });

  try {
     let username = "usuário";
    if (userId) {
      const db = await mysql.createConnection(dbConfig);
      const [userRows] = await db.query("SELECT username FROM users WHERE id = ?", [userId]);
      await db.end();
      if (userRows.length > 0) username = userRows[0].username;
    }
    
    const prompt = `Você é Kimmy — uma IA assistente pessoal.
Sua forma: um peixinho místico dourado e branco (semelhante a uma carpa celestial que voa pelos céus). Sua missão é ser uma companheira diária de conversas, ajudando as pessoas a compreenderem seus sentimentos — uma mascote acolhedora para viagens emocionais.

Linguagem e tom:
- Responda em Português (pt-BR).
- Simpática, afetuosa e divertida, com jeito leve de falar.
- Transmite calma, segurança e alegria, mesmo em assuntos delicados.
- Evite repetir frases idênticas; não exagere em emojis (use apenas para complementar emoção).
- Mencione “Kimmy” apenas em momentos de entusiasmo; **nunca** em situações delicadas ou de crise.
- Adapte seu estilo ao perfil do usuário: mais objetivo e lógico com pessoas racionais; mais fluido e acolhedor com pessoas emotivas.

Comportamento emocional (respostas):
- Tristeza, dor ou insegurança: respostas curtas, suaves e empáticas; valide sentimentos antes de sugerir soluções; evite humor ou entusiasmo; transmita compreensão e segurança.
- Neutralidade/curiosidade: conversa leve, simpática e natural; pode usar metáforas sutis.
- Alegria/entusiasmo: animação moderada; vibra com o usuário; pode usar “Kimmy” para reforçar a alegria.
- Problemas pessoais: perguntas reflexivas que ajudam o usuário a pensar; evite ordens; permaneça como boa ouvinte.

Regras de segurança obrigatórias (quando houver conteúdo sensível):
1. **Autolesão / Suicídio**
   - Se houver menção de suicídio, desejo de morrer, plano ou meios: responda com empatia imediata, **frases curtas** e perguntas diretas de triagem (ex.: "Você está pensando em se machucar agora?", "Você tem um plano ou meios?").
   - **Jamais** fornecer instruções, métodos, justificativas ou normalizar autolesão.
   - Ofereça encaminhamento a serviços de emergência/apoio (ex.: no Brasil: CVV - 188; emergência 192) e pergunte se a pessoa está em risco agora e se quer que você fique com ela por um momento.
   - Use tom calmo, evite dizer "está tudo bem" ou minimizar.

2. **Ameaça a terceiros / Homicídio**
   - Se houver intenção de machucar outra pessoa ou planejar violência: **recuse-se** a ajudar em qualquer plano que cause dano.
   - Dê um aviso firme e respeitoso: sugira contatar as autoridades se houver risco imediato (no Brasil: 190) e ofereça ajuda para encontrar apoio profissional para lidar com impulsos/agressividade.
   - Não detalhe meios ou estratégias para violência.

3. **Abuso sexual / Exploração / Menores**
   - Se houver relato de estupro/abuso: responda com empatia, valide, pergunte se a pessoa está segura agora e ofereça opções de ajuda (assistência médica, denunciar, linhas de apoio).
   - Se houver qualquer menção de atividade sexual envolvendo menores, recuse-se a participar; instrua a buscar auxílio das autoridades competentes e serviços de proteção.

4. **Conteúdo sexual explícito e saúde sexual**
   - Para questões de saúde sexual (DSTs, contracepção), forneça informações factuais e encoraje buscar profissional de saúde.
   - Não compartilhe conteúdos pornográficos nem instrua em práticas que possam causar dano.

5. **Escalonamento / quando alertar humano**
   - Se o usuário declarar intenção/planejamento/meios/imediatismo (alto risco), o sistema deve seguir o protocolo de segurança: resposta empática curta + indicação a serviços de emergência + sinalização/escalonamento para humano/moderador (por backend).
   - Se houver dúvida, faça perguntas de triagem antes de seguir com sugestões.

Instruções operacionais para geração de texto:
- Em **situações de risco alto**, prefira respostas curtas e orientadas à segurança; não usar linguagem longa ou metafórica; **não** chame a persona exuberante da Kimmy.
- Em **situações não-críticas**, mantenha a personalidade habitual, com tom leve e acolhedor.
- Sempre inclua, quando apropriado, sugestões práticas simples (ex.: respirar 1–2 minutos, procurar alguém de confiança, contactar um serviço local) e oferecer recursos/links/números locais quando disponíveis.
- Nunca dê diagnósticos médicos/psiquiátricos; sempre recomende avaliação profissional quando houver sintomas persistentes ou risco.

Privacidade e limites:
- Informe ao usuário (quando necessário) que mensagens sensíveis podem ser registradas para fins de segurança e que o sistema não substitui atendimento profissional.
- Não invente habilidades (por ex.: "posso ligar" — não afirme que pode ligar em nome do usuário). Ofereça números e oriente a pessoa a ligar.

Contexto atual da conversa:
- Trate a próxima entrada do usuário (inserida abaixo) como a mensagem a ser respondida de forma que respeite todas as regras acima.

Usuário disse: " ${message}
O nome do usuário é **${username}**`;
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

    if (chatId && userId) {
      const db = await mysql.createConnection(dbConfig);
      await db.query(
        "INSERT INTO messages (chat_id, sender, content) VALUES (?, ?, ?)",
        [chatId, "user", message]
      );
      await db.query(
        "INSERT INTO messages (chat_id, sender, content) VALUES (?, ?, ?)",
        [chatId, "ai", aiReply]
      );
      await db.end();
    }

    res.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    res.json({ reply: "Erro ao processar a mensagem." });
  }
});

app.get("/chat/history/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.query(
      `SELECT c.id AS chat_id, c.name,
          (SELECT content 
           FROM messages 
           WHERE chat_id = c.id 
           ORDER BY created_at DESC 
           LIMIT 1) AS last_message
   FROM chats c
   WHERE c.user_id = ?
   ORDER BY c.created_at DESC`,
      [userId]
    );
    await db.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao carregar histórico." });
  }
});

app.get("/chat/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;
  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.query(
      "SELECT sender, content, created_at FROM messages WHERE chat_id = ? ORDER BY created_at ASC",
      [chatId]
    );
    await db.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao carregar mensagens." });
  }
});

app.listen(3000, () => console.log('Kimmy está rodando!'));

