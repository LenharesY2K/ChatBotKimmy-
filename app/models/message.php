<?php require_once __DIR__ . '/../core/database.php';

class Message {
    private $db;

    public function __construct($pdo) {
        $this->db = $pdo;
    }

    public function create($chatId, $sender, $content) {
        $stmt = $this->db->prepare("INSERT INTO messages (chat_id, sender, content) VALUES (?, ?, ?)");
        $stmt->execute([$chatId, $sender, $content]);
        return $this->db->lastInsertId();
    }

    public function getByChat($chatId) {
        $stmt = $this->db->prepare("SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC");
        $stmt->execute([$chatId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
