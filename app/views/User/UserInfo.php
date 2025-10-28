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
        <div class="profile-frame">
            <div class="frame-ring"></div>
            <img src="caminho/para/foto-usuario.jpg" alt="Foto do usuário" class="profile-photo">
        </div>
        <form action="/user/update" method="POST">
            <input type="hidden" name="id" value="<?= htmlspecialchars($data['id']) ?>">

            <label for="username">Usuario</label>
            <input type="text" id="username" name="username" value="<?= htmlspecialchars($data['username']) ?>" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="<?= htmlspecialchars($data['email']) ?>" required>

            <button type="submit">Salvar</button>
    </div>
</div>

<?php if (!empty($success) && $success): ?>
    <script>
        alert("Usuário atualizado com sucesso!");
    </script>
<?php endif; ?>

<?php include __DIR__ . '/../Templates/footer.php'; ?>