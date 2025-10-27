<?php require_once __DIR__ . '/../core/database.php';

class UserController
{

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require_once '../app/models/User.php';
            $userModel = new User();

            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            if ($email && $password) {
                $user = $userModel->getByEmail($email);

                if ($user && password_verify($password, $user['password_hash'])) {
                    session_start();
                    $_SESSION['user_id'] = $user['id'];
                    header('Location: /');
                    exit();
                } else {
                    echo "Email ou senha incorretos!";
                }
            } else {
                echo "Preencha todos os campos!";
            }
        } else {
            require '../app/views/user/login.php';
        }
    }

    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require_once '../app/models/User.php';
            $userModel = new User();

            $username = $_POST['username'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            if ($username && $email && $password) {
                $userId = $userModel->create($username, $email, $password);
                header('Location: /login');
                exit();
            } else {
                echo "Preencha todos os campos!";
            }
        } else {
            require '../app/views/user/cadastrar.php';
        }
    }

    public function user() {}
}
