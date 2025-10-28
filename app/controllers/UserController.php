<?php require_once __DIR__ . '/../core/database.php';

require_once __DIR__ . '/../models/User.php';

class UserController
{
    private $userModel;

    public function __construct($pdo)
    {
        $this->userModel = new User($pdo);
    }

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
                    echo "<script>alert('Email ou senha incorretos!');</script>";
                }
            } else {
                echo "<script>alert('Preencha todos os campos!');</script>";
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
                echo "<script>alert('Preencha todos os campos!');</script>";
            }
        } else {
            require '../app/views/user/cadastrar.php';
        }
    }

    public function userInfo($userId)
    {
        if (!$userId) {
            http_response_code(401);
            return;
        }

        $user = $this->userModel->getById($userId);

        if (!$user) {
            http_response_code(404);
            include '../app/views/errors/404.php';
            return;
        }
        $data = [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email']
        ];
        include '../app/views/user/UserInfo.php';
    }

    public function fish($userId)
    {

        if (!$userId) {
            http_response_code(404);
            include '../app/views/errors/404.php';
        }

        require '../app/views/user/Fish.php';
    }

    public function update()
    {

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo "Método não permitido.";
            return;
        }
        $id = $_POST['id'] ?? null;
        $username = $_POST['username'] ?? null;
        $email = $_POST['email'] ?? null;

        if (!$id || !$username || !$email) {
            http_response_code(400);
            echo "Todos os campos são obrigatórios.";
            return;
        }

        $updated = $this->userModel->update($id, $username, $email);

        if ($updated) {
            $this->userInfo($id);
            echo "<script>alert('Usuário atualizado com sucesso!');</script>";
        } else {
            http_response_code(500);
            echo "<script>alert('Erro ao atualizar usuario!');</script>";
        }
    }
}
