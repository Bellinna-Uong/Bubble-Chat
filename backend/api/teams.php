<?php
include_once 'db_config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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
                $stmt = $pdo->prepare("INSERT INTO teams (name) VALUES (:name)");
                $stmt->execute(['name' => $roomName]);
                echo json_encode(["success" => true, "message" => "Salle '$roomName' créée avec succès."]);
            } catch (PDOException $e) {
                echo json_encode(["success" => false, "message" => "Erreur lors de la création de la salle: " . $e->getMessage()]);
            }
            break;

        case "user_teams":
            // Exemple d'ID utilisateur, remplacez cela par la méthode réelle pour récupérer l'ID de l'utilisateur connecté
            $userId = 1; // Vous devez gérer l'authentification pour obtenir l'ID de l'utilisateur connecté.

            try {
                $stmt = $pdo->prepare("SELECT t.id, t.name FROM teams t
                                       JOIN team_members tm ON tm.team_id = t.id
                                       WHERE tm.user_id = :user_id");
                $stmt->execute(['user_id' => $userId]);
                $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);

                echo json_encode(["success" => true, "teams" => $teams]);
            } catch (PDOException $e) {
                echo json_encode(["success" => false, "message" => "Erreur lors de la récupération des équipes : " . $e->getMessage()]);
            }
            break;

        default:
            echo json_encode(["success" => false, "message" => "Commande '$command' inconnue."]);
            break;
    }
}
