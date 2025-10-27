<?php include __DIR__ . '/../Templates/header.php'; ?>

<div class="orb orb1"></div>
<div class="orb orb2"></div>
<div class="orb orb3"></div>
<div class="orb orb4"></div>

<div class="particles" id="particles"></div>

<div class="shine"></div>

<div class="content">
  <div class="login-container">
    <h2>Login</h2>
    <form id="loginForm" action="/login" method="POST">
      <div class="input-group">
        <input type="email" name="email" placeholder="Email" required>
        <i class="fa fa-user fa-lg"></i>
      </div>
      <div class="input-group">
        <input type="password" name="password" placeholder="Password" required>
        <i class="fa fa-lock fa-lg"></i>
      </div>
      <button type="submit">Entrar</button>
      <div class="input-group">
        <a id="register-route" href="/register" class="a_login">You don't have a login? Create a User!</a>
      </div>
    </form>
  </div>
</div>

<img src="IMG/byPL.png" alt="Logo"
  style="position: absolute; top: 20px; left: 20px; width: 120px; height: auto;">


<?php include __DIR__ . '/../Templates/footer.php'; ?>