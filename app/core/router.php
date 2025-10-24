<?php

class Router
{
    public static function route($url)
    {

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

            case '/login':
                require_once '../controllers/UserController.php';
                $controller = new UserController();
                $controller->login();
                break;

            default:
                http_response_code(404);
                echo "404 - Página não encontrada";
                break;
        }
    }
}
