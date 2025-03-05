const mysql = require('mysql2');

// Criando a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL
    user: 'root',      // Usuário do MySQL
    password: 'P4ssw0rd',      // Senha do MySQL
    database: 'tarefas_db' // Nome do banco de dados
});

// Conectando ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;