const inputEl = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const chatList = document.getElementById('chatList');

inputEl.addEventListener('keydown', function (e) {
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

    // Mantém negrito **texto**
    let formatted = message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.textContent = '|';
    p.appendChild(cursor);

    // Divide o texto em blocos de código e texto normal
    const parts = formatted.split(/(```[\s\S]*?```)/g);

    let partIndex = 0;
    let charIndex = 0;

    function typeChar() {
        if (partIndex >= parts.length) {
            cursor.remove();
            chatBox.scrollTop = chatBox.scrollHeight;
            return;
        }

        const currentPart = parts[partIndex];

        if (currentPart.startsWith('```')) {
            // Bloco de código: insere de uma vez
            const codeContent = currentPart.slice(3, -3); // remove as crases
            const codeEl = document.createElement('pre');
            codeEl.textContent = codeContent;
            p.insertBefore(codeEl, cursor);
            partIndex++;
            charIndex = 0;
            setTimeout(typeChar, delay);
        } else {
            // Texto normal: digita letra por letra
            if (charIndex >= currentPart.length) {
                partIndex++;
                charIndex = 0;
                setTimeout(typeChar, delay);
                return;
            }

            const nextChar = currentPart[charIndex];
            if (nextChar === '<') {
                const tagEnd = currentPart.indexOf('>', charIndex);
                if (tagEnd !== -1) {
                    const tag = currentPart.slice(charIndex, tagEnd + 1);
                    const temp = document.createElement('span');
                    temp.innerHTML = tag;
                    while (temp.firstChild) {
                        p.insertBefore(temp.firstChild, cursor);
                    }
                    charIndex = tagEnd + 1;
                } else {
                    p.insertBefore(document.createTextNode(nextChar), cursor);
                    charIndex++;
                }
            } else if (nextChar === '\n') {
                const br = document.createElement('br');
                p.insertBefore(br, cursor);
                charIndex++;
            } else {
                cursor.insertAdjacentText('beforebegin', nextChar);
                charIndex++;
            }

            chatBox.scrollTop = chatBox.scrollHeight;
            setTimeout(typeChar, delay);
        }
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
