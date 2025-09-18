// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.textContent = task.text;

    // Buttons
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

// Press Enter to add task
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

// Initial render
renderTasks();
