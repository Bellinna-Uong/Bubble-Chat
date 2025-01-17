CREATE DATABASE IF NOT EXISTS chat_app;

USE chat_app;

CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );