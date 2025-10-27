<?php require_once __DIR__ . '/../core/database.php';

class Chat
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function create($userId, $name = 'New Chat')
    {
        $stmt = $this->db->prepare("INSERT INTO chats (user_id, name) VALUES (?, ?)");
        $stmt->execute([$userId, $name]);
        return $this->db->lastInsertId();
    }

    public function getByUser($userId)
    {
        $stmt = $this->db->prepare("SELECT * FROM chats WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
