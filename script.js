const form = document.querySelector('.task_form');
const input = document.querySelector('.task_input');
const list_el = document.querySelector('.tasks');

// Load the tasks from local storage on page load
window.addEventListener("load", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    addTaskToList(task);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let task = input.value;
  if(!task) {
    alert('Please fill the form');
  } else{
    addTaskToList(task);
    input.value = '';
    saveTasksToLocalStorage();
  }
});

function addTaskToList(task) {
  const task_el = document.createElement('div');
  task_el.classList.add('task');
  const task_content_el = document.createElement('div');
  task_content_el.classList.add('content');
  task_el.appendChild(task_content_el);

  const task_input_el = document.createElement('input');
  task_input_el.classList.add('text');
  task_input_el.type = 'text';
  task_input_el.value = task;
  task_input_el.setAttribute('readonly', 'readonly');

  task_content_el.appendChild(task_input_el);

  const task_actions_el = document.createElement('div');
  task_actions_el.classList.add('actions');

  const task_edit_el = document.createElement('button');
  task_edit_el.classList.add('edit');
  task_edit_el.innerText = 'Edit';

  const task_delete_el = document.createElement('button');
  task_delete_el.classList.add('delete');
  task_delete_el.innerText = 'Delete';

  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);
  task_el.appendChild(task_actions_el);

  list_el.appendChild(task_el);

  task_edit_el.addEventListener('click', (e) => {
    if (task_edit_el.innerText.toLowerCase() == "edit") {
      task_edit_el.innerText = "Save";
      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
    } else {
      task_edit_el.innerText = "Edit";
      task_input_el.setAttribute("readonly", "readonly");
      saveTasksToLocalStorage();
      }
      });

      task_delete_el.addEventListener('click', (e) => {
      task_el.remove();
      saveTasksToLocalStorage();
      });
      }

      function saveTasksToLocalStorage() {
      const tasks = [];
      list_el.querySelectorAll('.task .text').forEach(task => {
      tasks.push(task.value);
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
      }
