<?php
header('Content-Type: application/json');

// Conexão XAMPP/MySQL
try {
    $pdo = new PDO("mysql:host=localhost;dbname=Kimmy", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['reply' => "Erro de conexão: " . $e->getMessage()]);
    exit;
}

// Recebe POST
$data = json_decode(file_get_contents('php://input'), true);
$userMessage = $data['message'] ?? '';

if (!$userMessage) {
    echo json_encode(['reply' => 'Mensagem vazia']);
    exit;
}

// --- Chamada à IA real no HuggingFace ---
$huggingfaceToken = "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"; // substitua pelo seu token

$ch = curl_init("https://api-inference.huggingface.co/models/gpt2");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $huggingfaceToken"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['inputs' => $userMessage]));

$response = curl_exec($ch);
curl_close($ch);

// Interpreta resposta
$aiReply = 'Não consegui responder.';
$json = json_decode($response, true);
if (isset($json[0]['generated_text'])) {
    $aiReply = $json[0]['generated_text'];
}

// Salva no banco
$stmt = $pdo->prepare("INSERT INTO chat_history (user_message, ai_reply) VALUES (?, ?)");
$stmt->execute([$userMessage, $aiReply]);

// Retorna resposta
echo json_encode(['reply' => $aiReply]);