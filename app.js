// Helper functions for localStorage
function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the list
function renderTodos() {
  const todos = getTodos();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    // Check button
    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn';
    checkBtn.innerHTML = todo.completed ? '✔️' : '⬜';
    checkBtn.title = 'Toggle complete';
    checkBtn.onclick = () => toggleComplete(idx);

    // Task text
    const span = document.createElement('span');
    span.textContent = todo.text;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete task';
    deleteBtn.onclick = () => deleteTodo(idx);

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addTodo(text) {
  if (!text.trim()) return;
  const todos = getTodos();
  todos.push({ text, completed: false });
  saveTodos(todos);
  renderTodos();
}

function deleteTodo(idx) {
  const todos = getTodos();
  todos.splice(idx, 1);
  saveTodos(todos);
  renderTodos();
}

function toggleComplete(idx) {
  const todos = getTodos();
  todos[idx].completed = !todos[idx].completed;
  saveTodos(todos);
  renderTodos();
}

// Form submission
document.getElementById('todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  addTodo(input.value);
  input.value = '';
});

// Initial render
window.addEventListener('DOMContentLoaded', renderTodos);