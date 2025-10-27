<?php require_once __DIR__ . '/../core/database.php';

class user{
    
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function create($username, $email, $password) {
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->db->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hash]);
        return $this->db->lastInsertId();
    }

    public function getByEmail($email) {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function verifyPassword($email, $password) {
        $user = $this->getByEmail($email);
        if (!$user) return false;
        return password_verify($password, $user['password_hash']);
    }

}