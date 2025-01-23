<?php
include_once 'db_config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Permet toutes les origines, vous pouvez restreindre si nécessaire
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Les méthodes autorisées
header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes nécessaires, ici Content-Type

// Gérer la requête OPTIONS (pré-vérification CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Nous ne faisons rien de plus pour une requête OPTIONS
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $command = $data['command'] ?? null;
    $args = $data['args'] ?? [];

    if (!$command) {
        echo json_encode(["success" => false, "message" => "Aucune commande spécifiée."]);
        exit;
    }

    switch ($command) {
        case "create":
            $roomName = $args[0] ?? "Unnamed Room";
            try {
                // Assurez-vous que la table existe et que le champ 'name' est correct
                $stmt = $pdo->prepare("INSERT INTO teams (name) VALUES (:name)");
                $stmt->execute(['name' => $roomName]);
                echo json_encode(["success" => true, "message" => "Salle '$roomName' créée avec succès."]);
            } catch (PDOException $e) {
                echo json_encode(["success" => false, "message" => "Erreur lors de la création de la salle: " . $e->getMessage()]);
            }
            break;

        default:
            echo json_encode(["success" => false, "message" => "Commande '$command' inconnue."]);
            break;
    }
}
