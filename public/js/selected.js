const chatList = document.getElementById('chatList');

chatList.addEventListener('click', (e) => {

    const entry = e.target.closest('.chat-entry');
    if (!entry) return;

    chatList.querySelectorAll('.chat-entry').forEach(e => e.classList.remove('selected'));
    entry.classList.add('selected');

});