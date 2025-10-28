<?php include __DIR__ . '/../Templates/header.php'; ?>

<div class="orb orb1"></div>
<div class="orb orb2"></div>
<div class="orb orb3"></div>
<div class="orb orb4"></div>

<div class="particles" id="particles"></div>

<div class="shine"></div>

<div class="content">

    <a href="/" class="close-button">
        <span></span>
        <span></span>
    </a>

    <div class="user-container">
        <h2>Userinfo</h2>

        <form method="POST" enctype="multipart/form-data" action="/user/update">
            <div class="profile-frame" id="profileFrame">
                <div class="frame-ring"></div>
                <img
                    id="profilePreview"
                    src="<?= !empty($user['profile_image']) ? $user['profile_image'] : 'uploads/default.png'; ?>"
                    alt="Foto do usuário"
                    class="profile-photo">
            </div>

            <input type="file" name="imagem" id="inputImagem" accept="image/*" hidden>

            <input type="hidden" name="id" value="<?= htmlspecialchars($data['id']) ?>">

            <label for="username">Usuário</label>
            <input type="text" id="username" name="username" value="<?= htmlspecialchars($data['username']) ?>" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="<?= htmlspecialchars($data['email']) ?>" required>

            <button type="submit">Salvar</button>
        </form>
    </div>
</div>

<?php if (!empty($success) && $success): ?>
    <script>
        alert("Usuário atualizado com sucesso!");
    </script>
<?php endif; ?>

<?php include __DIR__ . '/../Templates/footer.php';

if (isset($_GET['success'])) {
    echo "<script>alert('Usuário editado com sucesso!');</script>";
}
?>