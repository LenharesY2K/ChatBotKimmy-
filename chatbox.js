document.getElementById('userInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const inputEl = document.getElementById('userInput');
    const message = inputEl.value.trim();
    if (!message) return;

    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `<p class="user">${message}</p>`;

    try {
        const response = await fetch('chat.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        const aiReply = data.reply || "Não consegui responder.";
        typeMessage(`Kimmy: ${aiReply}`);

    } catch (error) {
        typeMessage("Kimmy: Erro ao conectar com o servidor.");
        console.error(error);
    }

    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeMessage(message, delay = 50) {
    const chatBox = document.getElementById('chatBox');
    const p = document.createElement('p');
    p.classList.add('ai');
    chatBox.appendChild(p);

    let i = 0;
    const interval = setInterval(() => {
        p.textContent += message[i];
        i++;
        if (i >= message.length) clearInterval(interval);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, delay);
}


function typeMessage(message, delay = 1) {
    const chatBox = document.getElementById('chatBox');
    const p = document.createElement('p');
    p.classList.add('ai');
    chatBox.appendChild(p);

    let i = 0;
    const interval = setInterval(() => {
        p.textContent += message[i];
        i++;
        if (i >= message.length) clearInterval(interval);
    }, delay);
}

function typeMessage(message, delay = 50) {
    const chatBox = document.getElementById('chatBox');
    const p = document.createElement('p');
    p.classList.add('ai');

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.textContent = '|';
    p.appendChild(cursor);

    chatBox.appendChild(p);

    let i = 0;
    const interval = setInterval(() => {
        cursor.insertAdjacentText('beforebegin', message[i]);
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            cursor.remove();
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }, delay);
}