const userIcon = document.getElementById('user');

userIcon.addEventListener('click', () => {
    carregarUserInfo();
});

async function carregarUserInfo() {
    try {
        const response = await fetch('/router.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'route=/UserInfo'
        });

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            console.log('Usuário:', data.username, '| Email:', data.email);
        }
    } catch (error) {
        console.error('Erro ao carregar informações do usuário', error);
    }
}

document.getElementById('x').onclick = function () {
    window.location.href = "/";
};