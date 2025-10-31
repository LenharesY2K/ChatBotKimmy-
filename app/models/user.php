<?php require_once __DIR__ . '/../core/database.php';

class user
{

    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function create($username, $email, $password)
    {
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->db->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hash]);
        return $this->db->lastInsertId();
    }

    public function getByEmail($email)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function verifyPassword($email, $password)
    {
        $user = $this->getByEmail($email);
        if (!$user) return false;
        return password_verify($password, $user['password_hash']);
    }

    public function getById($id)
    {
        $stmt = $this->db->prepare("SELECT id, username, email, profile_image FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id, $username, $email)
    {
        $sql = "UPDATE users SET username = :username, email = :email WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':id' => $id
        ]);
    }

    public function updateProfileImage($id, $imagePath)
    {
        $sql = "UPDATE users SET profile_image = :image WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':image' => $imagePath,
            ':id' => $id
        ]);
    }
}
