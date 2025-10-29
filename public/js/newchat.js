document.addEventListener("DOMContentLoaded", () => {
    const newChatBtn = document.getElementById("newChat");
    const chatList = document.getElementById("chatList");
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");

    const userId = window.userId || 1;
    window.currentChatId = null;

    window.setCurrentChatId = (chatId) => {
        window.currentChatId = chatId;
    };

    async function createNewChat() {
        try {
            const response = await fetch("http://localhost:3000/chat/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            if (data.chatId) {
                addChatToSidebar(data.chatId, "Novo Chat");

                window.setCurrentChatId(data.chatId);
                chatBox.innerHTML = "";
                loadChatMessages(data.chatId);
            }
        } catch (err) {
            console.error("Erro ao criar novo chat:", err);
            alert("Erro ao criar chat.");
        }
    }

    function addChatToSidebar(chatId, chatName) {
        const li = document.createElement("li");
        li.classList.add("chat-item");
        li.dataset.chatId = chatId;

        li.innerHTML = `
          <div class="chat-entry">
          <i class="fa fa-message fa-lg"></i>
          <span>${chatName}</span>
          </div>
        `;

        li.addEventListener("click", () => {
            loadChatMessages(chatId);
            window.setCurrentChatId(chatId);
        });

        chatList.prepend(li);
    }

    async function loadChatHistory() {
        try {
            const res = await fetch(`http://localhost:3000/chat/history/${userId}`);
            const chats = await res.json();
            chatList.innerHTML = "";
            chats.forEach(chat => addChatToSidebar(chat.chat_id, chat.name));
        } catch (err) {
            console.error("Erro ao carregar histórico:", err);
        }
    }

    async function loadChatMessages(chatId) {
        chatBox.innerHTML = "<p>Carregando mensagens...</p>";
        try {
            const response = await fetch(`http://localhost:3000/chat/${chatId}/messages`);
            const messages = await response.json();
            chatBox.innerHTML = "";

            messages.forEach(msg => {
                const p = document.createElement("p");
                p.className = msg.sender === "ai" ? "ai" : "user";
                p.textContent = msg.content;
                chatBox.appendChild(p);
            });

            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (err) {
            console.error("Erro ao carregar mensagens:", err);
            chatBox.innerHTML = "<p>Erro ao carregar mensagens.</p>";
        }
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message || !window.currentChatId) return;

        appendUserMessage(message);
        userInput.value = "";

        try {
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, chatId: window.currentChatId, message })
            });
            const data = await response.json();

            appendAIMessage(data.reply || "Não consegui responder.");

        } catch (err) {
            appendAIMessage("Erro ao conectar com o servidor.");
            console.error("Erro ao enviar mensagem:", err);
        }
    }

    function appendUserMessage(message) {
        const p = document.createElement("p");
        p.className = "user";
        p.textContent = message;
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendAIMessage(message, delay = 10) {
        const p = document.createElement("p");
        p.className = "ai";
        chatBox.appendChild(p);

        const cursor = document.createElement("span");
        cursor.className = "cursor";
        cursor.textContent = "|";
        p.appendChild(cursor);

        const parts = message.split(/(```[\s\S]*?```)/g);
        let partIndex = 0;
        let charIndex = 0;

        function typeChar() {
            if (partIndex >= parts.length) {
                cursor.remove();
                chatBox.scrollTop = chatBox.scrollHeight;
                return;
            }

            const currentPart = parts[partIndex];

            if (currentPart.startsWith("```")) {
                const codeContent = currentPart.slice(3, -3);
                const codeEl = document.createElement("pre");
                codeEl.textContent = codeContent;
                p.insertBefore(codeEl, cursor);
                partIndex++;
                charIndex = 0;
                setTimeout(typeChar, delay);
            } else {
                if (charIndex >= currentPart.length) {
                    partIndex++;
                    charIndex = 0;
                    setTimeout(typeChar, delay);
                    return;
                }
                const nextChar = currentPart[charIndex];
                if (nextChar === "\n") {
                    const br = document.createElement("br");
                    p.insertBefore(br, cursor);
                } else {
                    cursor.insertAdjacentText("beforebegin", nextChar);
                }
                charIndex++;
                chatBox.scrollTop = chatBox.scrollHeight;
                setTimeout(typeChar, delay);
            }
        }

        typeChar();
    }

    newChatBtn.addEventListener("click", createNewChat);
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    window.sendMessage = sendMessage;
    loadChatHistory();
});
