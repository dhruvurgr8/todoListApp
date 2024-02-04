const form = document.querySelector(".form");
const card = document.querySelector(".card");
const modal = document.querySelector(".modal");
const editForm = document.querySelector(".editForm");
const counter = document.querySelector(".counter");
const highPriority = document.querySelector(".counterHigh");
const todoCount = document.querySelector(".todo");
const inprogressCount = document.querySelector(".inprogress");
const completedCount = document.querySelector(".completed");
const searchInput = document.getElementById("searchInput");
const priorityFilter = document.getElementById("priorityFilter");
const statusFilter = document.getElementById("statusFilter");
const closeModal = document.querySelector(".close-modal");
closeModal.addEventListener("click", (e) => {
  modal.classList.add("hide-modal");
});
let todo = 0;
let inprogress = 0;
let completed = 0;
let highPriorityCounter = 0;

let taskData = {};
let count = 0;

function handleSubmit(e) {
  count++;
  updateCount();

  if (form.priority.value == "high") {
    highPriorityCounter++;
  }

  e.preventDefault();
  const data = {
    task: form.task.value,
    priority: form.priority.value,
    date: form.date.value,
    status: form.status.value,
  };
  taskData = data;
  if (form.status.value == "todo") {
    todo++;
  } else if (form.status.value == "inprogress") {
    inprogress++;
  } else {
    completed++;
  }
  showHighPriority();
  updateCompleted();
  updateInProgress();
  updateTodo();

  const div = document.createElement("div");
  div.classList.add("card-content");
  form.reset();
  div.innerHTML = `
    <div>
      <span class="getDate">${data.date}</span>
      <span class="getPriority">Priority: ${data.priority}</span>
    </div>
    <span class="getStatus">Status: ${data.status}</span>
    <p class="getTask">${data.task}</p>
    <div>
      <button class="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;

  const deleteBtn = div.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => handleDelete(div));

  const editBtn = div.querySelector(".editBtn");
  editBtn.addEventListener("click", () => {
    modal.classList.remove("hide-modal");
    editForm.editedTask.value = taskData.task;
    editForm.editedDate.value = taskData.date;
    editForm.editedPriority.value = taskData.priority;
    editForm.editStatus.value = taskData.status;
  });

  card.appendChild(div);
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const updatedValues = {
    updatedTask: editForm.editedTask.value,
    updatedDate: editForm.editedDate.value,
    updatedPriority: editForm.editedPriority.value,
    updatedStatus: editForm.editStatus.value,
  };
  console.log(updatedValues);
  editForm.reset();
  modal.classList.add("hide-modal");
  const getDate = document.querySelector(".getDate");
  const getTask = document.querySelector(".getTask");
  const getPriority = document.querySelector(".getPriority");
  const getStatus = document.querySelector(".getStatus");
  getDate.textContent = updatedValues.updatedDate;
  getTask.textContent = updatedValues.updatedTask;
  getPriority.textContent = `Priority:  ${updatedValues.updatedPriority}`;
  getStatus.textContent = `Status: ${updatedValues.updatedStatus}`;
});

function handleDelete(cardContent) {
  console.log("deleted");
  cardContent.remove();
}

form.addEventListener("submit", handleSubmit);

function updateCount() {
  counter.textContent = `${count}`;
}

function showHighPriority() {
  highPriority.textContent = `${highPriorityCounter} of ${count}`;
}

function updateTodo() {
  todoCount.textContent = `${todo}`;
}

function updateInProgress() {
  inprogressCount.textContent = `${inprogress}`;
}

function updateCompleted() {
  completedCount.textContent = `${completed}`;
}

// Function to filter tasks based on the search query, priority, and status
function filterTasks(query, priority, status) {
  const cards = document.querySelectorAll(".card-content");
  cards.forEach((card) => {
    const taskText = card.querySelector(".getTask").textContent.toLowerCase();
    const taskPriority = card
      .querySelector(".getPriority")
      .textContent.toLowerCase();
    const taskStatus = card
      .querySelector(".getStatus")
      .textContent.toLowerCase();

    const matchesQuery = taskText.includes(query.toLowerCase());
    const matchesPriority =
      priority === "all" || taskPriority.includes(priority.toLowerCase());
    const matchesStatus =
      status === "all" ||
      taskStatus.toLowerCase().includes(status.toLowerCase());

    if (matchesQuery && matchesPriority && matchesStatus) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

priorityFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

function applyFilters() {
  const searchQuery = searchInput.value.trim();
  const selectedPriority = priorityFilter.value;
  const selectedStatus = statusFilter.value;

  filterTasks(searchQuery, selectedPriority, selectedStatus);
}
