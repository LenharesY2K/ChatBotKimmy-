<?php

require_once '../app/models/Chat.php';

class ChatController
{
    private $chatModel;

    public function __construct($pdo)
    {
        $this->chatModel = new Chat($pdo);
    }

    public function newChat($userId)
    {
        $chatId = $this->chatModel->create($userId);
        echo json_encode(['chatId' => $chatId]);
    }
}
