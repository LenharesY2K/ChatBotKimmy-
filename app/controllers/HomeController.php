<?php

class HomeController
{
    public function index()
    {
        session_start();

        if (!isset($_SESSION['user_id'])) {
            header("Location: /login");
            exit;
        }

        $userId = $_SESSION['user_id'];

        require_once __DIR__ . '/../models/user.php';
        $userModel = new User();

        $user = $userModel->getById($userId);

        if (!$userId) {
            http_response_code(401);
            return;
        }

        if (!$user) {
            http_response_code(404);
            include '../app/views/errors/404.php';
            return;
        }

        require __DIR__ . '/../views/home/index.php';
    }

    public function getStarted()
    {
        session_start();
        session_unset();
        session_destroy();
        require __DIR__ . '/../views/home/getStarted.php';
    }
}
