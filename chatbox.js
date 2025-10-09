const inputEl = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const chatList = document.getElementById('chatList');

inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const message = inputEl.value.trim();
    if (!message) return;

    appendUserMessage(message);
    inputEl.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        const aiReply = data.reply || "Não consegui responder.";

        typeMessage(aiReply);
        carregarHistoricoSidebar();

    } catch (error) {
        typeMessage("Erro ao conectar com o servidor.");
        console.error("Erro:", error);
    }
}

function appendUserMessage(message) {
    const p = document.createElement('p');
    p.classList.add('user');
    p.textContent = message;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeMessage(message, delay = 10) {
    const p = document.createElement('p');
    p.classList.add('ai');
    chatBox.appendChild(p);

    // Converte **texto** em <b>texto</b>
    let formatted = message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Escapa caracteres especiais, exceto tags <b>
    formatted = formatted.replace(/&/g, "&amp;")
                         .replace(/</g, "&lt;")
                         .replace(/>/g, "&gt;")
                         .replace(/"/g, "&quot;")
                         .replace(/'/g, "&#039;")
                         .replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/g, "<b>$1</b>");

    let i = 0;
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.textContent = '|';
    p.appendChild(cursor);

    function typeChar() {
        if (i >= formatted.length) {
            cursor.remove();
            chatBox.scrollTop = chatBox.scrollHeight;
            return;
        }

        const nextChar = formatted[i];

        if (nextChar === '<') {
            const tagEnd = formatted.indexOf('>', i);
            if (tagEnd !== -1) {
                const tag = formatted.slice(i, tagEnd + 1);
                const temp = document.createElement('span');
                temp.innerHTML = tag;
                while (temp.firstChild) {
                    p.insertBefore(temp.firstChild, cursor);
                }
                i = tagEnd + 1;
            } else {
                p.insertBefore(document.createTextNode(nextChar), cursor);
                i++;
            }
        } else if (nextChar === '\n') {
            const br = document.createElement('br');
            p.insertBefore(br, cursor);
            i++;
        } else {
            cursor.insertAdjacentText('beforebegin', nextChar);
            i++;
        }

        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(typeChar, delay);
    }

    typeChar();
}

const decodeHtmlEntities = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
};

async function carregarHistoricoSidebar() {
    try {
        const response = await fetch('http://localhost:3000/chat/history');
        const history = await response.json();
        chatList.innerHTML = '';

        history.forEach(msg => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            div.classList.add('option-menu');

            const textoResumo = decodeHtmlEntities(
                msg.mensagem.length > 30 ? msg.mensagem.slice(0, 30) + '...' : msg.mensagem
            );

            const a = document.createElement('a');
            a.href = "#";
            a.textContent = textoResumo;

            div.appendChild(a);
            li.appendChild(div);
            chatList.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar histórico:", error);
    }
}
