<?php
class Database {
    private static $host = 'localhost';
    private static $dbName = 'kimmy_ai';
    private static $username = 'root';
    private static $password = '';
    private static $pdo = null;

    public static function connect() {
        if (self::$pdo === null) {
            try {
                $dsn = 'mysql:host=' . self::$host . ';dbname=' . self::$dbName . ';charset=utf8mb4';
                self::$pdo = new PDO($dsn, self::$username, self::$password);
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die('Erro ao conectar ao banco: ' . $e->getMessage());
            }
        }
        return self::$pdo;
    }

    public static function disconnect() {
        self::$pdo = null;
    }
}
