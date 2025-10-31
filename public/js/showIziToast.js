function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.style.opacity = 1;
    toast.style.transform = 'translateX(0)'; 
    toast.style.pointerEvents = 'auto';

    setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.transform = 'translateX(100%)'; 
        toast.style.pointerEvents = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const toastMessages = {
        'register_success': 'Usuário registrado com sucesso!',
        'login_error': 'Email ou senha incorretos!',
        'update_success': 'Usuário atualizado com sucesso!',
        'error': 'Preencha todos os campos!'
    };

    for (const [key, message] of Object.entries(toastMessages)) {
        if (urlParams.get(key) === '1') {
            showToast(message);
            break;
        }
    }
});
