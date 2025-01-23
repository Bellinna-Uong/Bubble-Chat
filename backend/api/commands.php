<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'chat_app';
$username = 'root';
$password = '21032003';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
    exit;
}

// Lire les données JSON envoyées
$requestMethod = $_SERVER['REQUEST_METHOD'];
if ($requestMethod !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée."]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$command = $input['command'] ?? null;
$args = $input['args'] ?? [];

if (!$command) {
    echo json_encode(["success" => false, "message" => "Aucune commande spécifiée."]);
    exit;
}

// Gestion des commandes
switch ($command) {
    case "create":
        $roomName = $args[0] ?? "Unnamed Room";
        // Insérer la salle dans la base de données
        $stmt = $pdo->prepare("INSERT INTO teams (name) VALUES (:name)");
        $stmt->execute(['name' => $roomName]);
        echo json_encode(["success" => true, "message" => "Salle '$roomName' créée avec succès."]);
        break;

    case "join":
        $roomName = $args[0] ?? null;
        if ($roomName) {
            // Vérifier si la salle existe
            $stmt = $pdo->prepare("SELECT * FROM teams WHERE name = :name");
            $stmt->execute(['name' => $roomName]);
            $team = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($team) {
                echo json_encode(["success" => true, "message" => "Rejoint la salle '$roomName'."]);
            } else {
                echo json_encode(["success" => false, "message" => "Salle '$roomName' introuvable."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Nom de la salle requis pour rejoindre."]);
        }
        break;

    case "delete":
        $roomName = $args[0] ?? null;
        if ($roomName) {
            // Supprimer la salle
            $stmt = $pdo->prepare("DELETE FROM teams WHERE name = :name");
            $stmt->execute(['name' => $roomName]);
            echo json_encode(["success" => true, "message" => "Salle '$roomName' supprimée avec succès."]);
        } else {
            echo json_encode(["success" => false, "message" => "Nom de la salle requis pour supprimer."]);
        }
        break;

    case "list":
        // Récupérer toutes les salles
        $stmt = $pdo->query("SELECT name FROM teams");
        $rooms = $stmt->fetchAll(PDO::FETCH_COLUMN);
        echo json_encode(["success" => true, "rooms" => $rooms]);
        break;

    default:
        echo json_encode(["success" => false, "message" => "Commande '$command' inconnue."]);
        break;
}
