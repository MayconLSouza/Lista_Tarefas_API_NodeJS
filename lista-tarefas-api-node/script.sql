-- Comando para criar a tabela de tarefas
CREATE DATABASE IF NOT EXISTS tarefas_db;

USE tarefas_db;

CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);
