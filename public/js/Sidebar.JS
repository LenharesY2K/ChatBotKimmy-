document.addEventListener('DOMContentLoaded', function () {
    const closeSidebarBtn = document.getElementById('CloseSidebar');
    const sidebar = document.querySelector('.sidebar');

    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', function () {
            sidebar.classList.toggle('active');

            const icon = closeSidebarBtn.querySelector('i');
            if (icon) {
                if (sidebar.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        document.addEventListener('click', function (event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnButton = closeSidebarBtn.contains(event.target);
            const isMobile = window.innerWidth <= 768;

            if (!isClickInsideSidebar && !isClickOnButton && sidebar.classList.contains('active') && isMobile) {
                sidebar.classList.remove('active');

                const icon = closeSidebarBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });
});

document.getElementById('newChat').addEventListener('click', () => {
    const userId = 1; 

    fetch('/router.php', { 
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'route=/newChat&userId=' + userId
    })
    .then(res => res.json())
    .then(data => {
        if (data.chatId) {
            const li = document.createElement('li');
            const chatDiv = document.createElement('div');
            chatDiv.className = 'option-menu tooltip chat-item';
            chatDiv.dataset.chatId = data.chatId;
            chatDiv.textContent = 'New Chat'; 
          
            chatDiv.addEventListener('click', () => {
                openChatMemory(data.chatId);
            });

            li.appendChild(chatDiv);
            document.getElementById('chatList').prepend(li);
        }
    })
    .catch(err => console.error(err));
});

function openChatMemory(chatId) {
    console.log('Abrindo chat ID:', chatId);
    fetch('/getChat.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'chatId=' + chatId
    })
    .then(res => res.json())
    .then(data => {
        console.log('Mensagens do chat:', data);
    });
}

document.getElementById('user').onclick = function() {
  window.location.href = "/userInfo";
};

document.getElementById('fish').onclick = function() {
  window.location.href = "/fish";
};