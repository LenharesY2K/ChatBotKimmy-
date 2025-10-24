let currentChatId = null;
let chatCounter = 0;

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (message === '') return;

    // Mostra mensagem no chat principal
    const chatBox = document.getElementById('chatBox');
    const msgElement = document.createElement('div');
    msgElement.textContent = message;
    chatBox.appendChild(msgElement);

    // Se ainda não existe um chat ativo, cria um novo
    if (!currentChatId) {
        chatCounter++;
        currentChatId = `chat-${chatCounter}`;

        // Cria item de aba com o nome da primeira mensagem
        const chatList = document.getElementById('chatList');
        const li = document.createElement('li');
        li.textContent = cortarTitulo(message);
        li.setAttribute('data-chat-id', currentChatId);
        li.classList.add('chat-tab');
        li.addEventListener('click', () => abrirChat(li.getAttribute('data-chat-id')));
        chatList.appendChild(li);

        // Armazena o histórico
        chats[currentChatId] = [message];
    } else {
        // Se já existe chat, apenas adiciona ao histórico
        chats[currentChatId].push(message);
    }

    input.value = '';
}

// Função para cortar o título caso seja muito longo
function cortarTitulo(texto) {
    const limite = 20;
    return texto.length > limite ? texto.slice(0, limite) + '...' : texto;
}

// Estrutura para armazenar mensagens de cada chat
const chats = {};

// Abre um chat específico quando clicar na aba
function abrirChat(chatId) {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = '';
    currentChatId = chatId;
    chats[chatId].forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.textContent = msg;
        chatBox.appendChild(msgElement);
    });
}
