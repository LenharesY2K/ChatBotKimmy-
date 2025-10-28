<?php
require_once __DIR__ . '/../models/Chat.php';
require_once __DIR__ . '/../models/Message.php';

class ChatController
{
    private $chatModel;
    private $messageModel;

    public function __construct($pdo)
    {
        $this->chatModel = new Chat($pdo);
        $this->messageModel = new Message($pdo);
    }

    public function sendMessage($userId, $message)
    {
        $chats = $this->chatModel->getByUser($userId);
        if (count($chats) === 0) {
            $chatId = $this->chatModel->create($userId);
        } else {
            $chatId = $chats[0]['id'];
        }

        $this->messageModel->create($chatId, 'user', $message);

        $aiReply = "Resposta automática da AI";
        $this->messageModel->create($chatId, 'ai', $aiReply);

        echo json_encode(['chatId' => $chatId, 'reply' => $aiReply]);
    }

    public function getChatHistory($userId)
    {
        $chats = $this->chatModel->getByUser($userId);
        $history = [];
        foreach ($chats as $chat) {
            $messages = $this->messageModel->getByChat($chat['id']);
            $history[] = [
                'chatId' => $chat['id'],
                'messages' => $messages
            ];
        }
        echo json_encode($history);
    }
}
