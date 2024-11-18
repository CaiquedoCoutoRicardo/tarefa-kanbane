document.addEventListener('DOMContentLoaded', () => {
    const loadTasks = async () => {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();

        const columns = {
            "To Do": document.querySelector('#todo .tasks'),
            "In Progress": document.querySelector('#inprogress .tasks'),
            "Done": document.querySelector('#done .tasks')
        };

        // Limpa as colunas antes de adicionar tarefas
        Object.values(columns).forEach(col => col.innerHTML = '');

        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.innerHTML = `<strong>${task.title}</strong><p>${task.description}</p>`;
            columns[task.status].appendChild(taskDiv);
        });
    };

    loadTasks();
});
