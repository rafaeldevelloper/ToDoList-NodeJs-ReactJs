import express from 'express';
import cors from 'cors';

const server = express();
const port = 3000;

server.use(cors());
server.use(express.json()); // Permite ler JSON no corpo da requisição

// Dados simulados
let tasks = [];

// Endpoint raiz
server.get('/', (req, res) => {
  res.send('Bem-vindo à API de Tarefas!');
});

// Listar tarefas
server.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Cadastrar uma nova tarefa
server.post('/tasks', (req, res) => {
  const { task } = req.body;

  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'A tarefa não pode ser vazia!' });
  }

  tasks.push(task);
  res.status(201).json({ message: 'Tarefa adicionada com sucesso!', tasks });
});

// Remover uma tarefa
server.delete('/tasks/:index', (req, res) => {
  const { index } = req.params;

  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ error: 'Tarefa não encontrada!' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Tarefa removida com sucesso!', tasks });
});

// Inicia o servidor
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});