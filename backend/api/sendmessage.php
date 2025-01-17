<?php
$host = 'localhost';
$dbname = 'chat_app';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

$data = json_decode(file_get_contents('php://input'), true);

$teamId = $data['teamId'];
$message = $data['message'];
$username = 'user1'; // Utilisateur simulé pour cet exemple

$query = $pdo->prepare("INSERT INTO messages (team_id, username, text, created_at) VALUES (:teamId, :username, :text, NOW())");
$query->execute([
    'teamId' => $teamId,
    'username' => $username,
    'text' => $message,
]);

// Retourner les messages mis à jour
$query = $pdo->prepare("SELECT username, text FROM messages WHERE team_id = :teamId ORDER BY created_at ASC");
$query->execute(['teamId' => $teamId]);

echo json_encode($query->fetchAll(PDO::FETCH_ASSOC));
