const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Dados simulados
let tasks = [
    { id: 1, title: "Tarefa 1", description: "Descrição da Tarefa 1", status: "To Do" },
    { id: 2, title: "Tarefa 2", description: "Descrição da Tarefa 2", status: "In Progress" },
    { id: 3, title: "Tarefa 3", description: "Descrição da Tarefa 3", status: "Done" }
];

// GET - Listar tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST - Criar uma nova tarefa
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'To Do'
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT - Atualizar uma tarefa existente
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    res.json(task);
});

// DELETE - Deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: "Task deleted" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
