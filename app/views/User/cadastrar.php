<?php include __DIR__ . '/../Templates/header.php'; ?>

<div class="content">
    <div class="register-container">
        <h2>Registre-se</h2>
        <form id="loginForm" action="/register" method="POST">
            <div class="input-group">
                <input type="text" name="username" placeholder="Username" required>
                <i class="fa fa-user fa-lg"></i>
            </div>
            <div class="input-group">
                <input type="email" name="email" placeholder="Email" required>
                <i class="fa fa-envelope fa-lg"></i>
            </div>
            <div class="input-group">
                <input type="password" name="password" placeholder="Senha" required>
                <i class="fa fa-lock fa-lg"></i>
            </div>
            <button type="submit">Registrar</button>
            <a id="register-route" href="/login" class="a_login">Retornar a pagina de login</a>
        </form>
    </div>
</div>




<?php include __DIR__ . '/../Templates/footer.php'; ?>