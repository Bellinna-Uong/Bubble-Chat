<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Connexion to the database
$host = '127.0.0.1';
$dbname = 'chat_app';
$username = 'root';
$password = '123456';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'error de connexion à la base de données']);
    exit;
}

//Read JSON sended
$data = json_decode(file_get_contents('php://input', true));

if (!$data || isset($data['username']) ||!isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

//Search for user
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');
$stmt->execute([':username' => $data['username']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($data['password'], $user['password'])) {
    echo json_encode(['success' => true, 'message' => 'Connexion success']);
} else {
    echo json_encode(['success' => false, 'message' => 'Identifiants invalids']);
}
