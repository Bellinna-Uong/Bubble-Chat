<?php
// signup.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permet les requêtes depuis d'autres origines (CORS)
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Connexion à la base de données
$host = '127.0.0.1';
$dbname = 'chat_app';
$username = 'root';
$password = '21032003';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
    exit;
}

// Lecture des données JSON envoyées
$data = json_decode(file_get_contents('php://input'), true);

// Vérification des données
if (!$data || !isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

if (strlen($data['password']) < 6) {
    echo json_encode(['success' => false, 'message' => 'Le mot de passe doit contenir au moins 6 caractères']);
    exit;
}

// Insertion de l'utilisateur
try {
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');
    $stmt->execute([
        ':username' => $data['username'],
        ':password' => $hashedPassword
    ]);
    echo json_encode(['success' => true, 'message' => 'Inscription réussie']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur déjà utilisé']);
}
?>
