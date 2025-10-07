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
    chatBox.innerHTML += `<p class="user"><strong>Você:</strong> ${message}</p>`;

    try {
        const response = await fetch('chat.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        const aiReply = data.reply || "Não consegui responder.";
        chatBox.innerHTML += `<p class="ai"><strong>IA:</strong> ${aiReply}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p class="ai"><strong>IA:</strong> Erro ao conectar com o servidor.</p>`;
        console.error(error);
    }

    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}