<?php require_once __DIR__ . '/../core/database.php';
class Router
{
    public static function route($url)
    {
        global $pdo;
        $userId = $_POST['userId'] ?? null;
        $message = $_POST['message'] ?? null;

        $url = explode('?', $url)[0];

        switch ($url) {
            case '/':
                require_once __DIR__ . '/../controllers/HomeController.php';
                $controller = new HomeController();
                $controller->index();
                break;

            case '/getStarted':
                require_once __DIR__ . '/../controllers/HomeController.php';
                $controller = new HomeController();
                $controller->getStarted();
                break;

            case '/register':
                require_once __DIR__ . '/../controllers/UserController.php';
                $controller = new UserController($pdo);
                $controller->register();
                break;

            case '/login':
                require_once __DIR__ . '/../controllers/UserController.php';
                $controller = new UserController($pdo);
                $controller->login();
                break;

            case '/userInfo':
                session_start();
                $userId = $_SESSION['user_id'] ?? null;
                require_once __DIR__ . '/../controllers/UserController.php';
                $controller = new UserController($pdo);
                $controller->userInfo($userId);
                break;

            case '/fish':
                session_start();
                $userId = $_SESSION['user_id'] ?? null;
                require_once __DIR__ . '/../controllers/UserController.php';
                $controller = new UserController($pdo);
                $controller->fish($userId);
                break;

            case '/sendMessage':
                require_once __DIR__ . '/../controllers/ChatController.php';
                $controller = new ChatController($pdo);
                $controller->sendMessage($userId, $message);
                break;
            case '/user/update':
                session_start();
                $userId = $_SESSION['user_id'] ?? null;
                require_once __DIR__ . '/../controllers/UserController.php';
                $controller = new UserController($pdo);
                $controller->update();
                break;
            default:
                http_response_code(404);
                echo "404 - Página não encontrada";
                break;
        }
    }
}
