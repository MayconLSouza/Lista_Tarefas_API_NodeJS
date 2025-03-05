// Controlador para lidar com operações relacionadas às tarefas

const connection = require('../database');

// Função para listar tarefas
const listarTarefas = (req, res) => {
    const query = 'SELECT * FROM tarefas';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar tarefas: ', err);
            return res.status(500).json({ mensagem: 'Erro ao listar tarefas' });
        }
        if (results.length === 0) { // Verifica se não há tarefas no banco
            return res.status(200).json({ mensagem: "Nenhuma tarefa encontrada" });
        }
        res.json(results); // Retorna a lista de tarefas como JSON
    });
};

// Função para criar uma nova tarefa
const criarTarefa = (req, res) => {
    const { descricao } = req.body;
    const query = 'INSERT INTO tarefas (descricao) VALUES (?)';

    connection.query(query, [descricao], (err, result) => {
        if (err) {
            console.error('Erro ao criar tarefa: ', err);
            return res.status(500).json({ mensagem: 'Erro ao criar tarefa' });
        }
        res.status(201).json({ id: result.insertId, descricao }); // Retorna a nova tarefa criada
    });
};

// Função para atualizar uma tarefa
const atualizarTarefa = (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;
    const query = 'UPDATE tarefas SET descricao = ? WHERE id = ?';

    connection.query(query, [descricao, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar tarefa: ', err);
            return res.status(500).json({ mensagem: 'Erro ao atualizar tarefa' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        }
        
        res.status(200).json({ id, descricao });
    });
};

// Função para excluir uma tarefa
const excluirTarefa = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tarefas WHERE id = ?';
    
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir tarefa: ', err);
            return res.status(500).json({ mensagem: 'Erro ao excluir tarefa' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        }
        
        res.status(200).json({ mensagem: 'Tarefa excluída com sucesso' });
    });
};

// Exportando os controladores para serem utilizados em outros arquivos
module.exports = { listarTarefas, criarTarefa, atualizarTarefa, excluirTarefa };