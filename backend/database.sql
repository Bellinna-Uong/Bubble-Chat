-- Création de la base de données
CREATE DATABASE IF NOT EXISTS chat_app;

-- Utilisation de la base de données
USE chat_app;

-- Création de la table `users`
CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );

-- Insertion de données d'exemple
INSERT INTO users (username, password)
VALUES
    ('test', MD5('passwrd'));
