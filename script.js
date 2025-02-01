const taskListContainer = document.getElementById("task-list");
const addTaskButton = document.getElementById("addTaskButton");
const taskDescriptionInput = document.getElementById("taskDescription");

const API_URL = '';


// Function to fetch tasks from the API
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Function to render tasks in the DOM
function renderTasks(tasks) {
  taskListContainer.innerHTML = ""; // Clear previous tasks
  tasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
      <span>${task.description}</span>
      <span>${new Date(task.created_at).toLocaleString()}</span>
    `;
    
    taskListContainer.appendChild(taskElement);
  });
}

// Function to add a new task
async function addTask(description) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description })
    });

    if (response.ok) {
      const newTask = await response.json();
      // Re-fetch tasks after adding a new one
      fetchTasks();
    } else {
      alert("Failed to add task.");
    }
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

// Add event listener to the Add Task button
addTaskButton.addEventListener("click", () => {
  const description = taskDescriptionInput.value.trim();
  if (description) {
    addTask(description);
    taskDescriptionInput.value = ""; // Clear input field
  } else {
    alert("Please enter a task description.");
  }
});

// Fetch tasks when the page loads
window.onload = fetchTasks; 
