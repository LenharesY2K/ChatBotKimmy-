<?php include __DIR__ . '/../Templates/header.php'; ?>

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
                    src="<?= str_replace('public/', '', $user['profile_image'] ?? 'uploads/default_photo.jpeg') ?>" alt="Profile"
                    alt="Foto do usuário"
                    class="profile-photo">
                <i class="fa-solid fa-camera camera-icon"></i>
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

<?php include __DIR__ . '/../Templates/footer.php';

?>