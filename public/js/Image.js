const frame = document.getElementById('profileFrame');
const input = document.getElementById('inputImagem');
const preview = document.getElementById('profilePreview');

frame.addEventListener('click', () => input.click());

input.addEventListener('change', () => {
    const arquivo = input.files[0];
    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = e => preview.src = e.target.result;
        leitor.readAsDataURL(arquivo);
    }
});
