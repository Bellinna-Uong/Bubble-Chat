<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"));

if ($data->username === "user" && $data->password === "pass") {
    echo json_encode(["success" => true, "message" => "Login successful!"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
?>
