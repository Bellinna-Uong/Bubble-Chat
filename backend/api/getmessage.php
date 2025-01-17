<?php
$host = 'localhost';
$dbname = 'chat_app';
$username = 'root';
$password = '';

// Connexion à la base de données
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Récupérer les messages pour une équipe spécifique
$teamId = isset($_GET['teamId']) ? intval($_GET['teamId']) : 0;

$query = $pdo->prepare("SELECT username, text FROM messages WHERE team_id = :teamId ORDER BY created_at ASC");
$query->execute(['teamId' => $teamId]);

echo json_encode($query->fetchAll(PDO::FETCH_ASSOC));
