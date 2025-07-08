//Task storage and initialization
const taskRepository = JSON.parse(localStorage.getItem("taskStorage")) || [];

//DOM element references
const newTaskNameField = document.getElementById("taskName");
const newTaskCategoryField = document.getElementById("category");
const newTaskDeadlineField = document.getElementById("deadline");
const newTaskStatusField = document.getElementById("status");
const taskContainer = document.getElementById("taskList");
const filteredTaskContainer = document.getElementById("filteredTaskList");

//Handle new tasks creation
function processNewTask() {
  const taskTitle = newTaskNameField.value.trim();
  const taskCategory = newTaskCategoryField.value.trim();
  const taskDueDate = newTaskDeadlineField.value;
  const taskState = newTaskStatusField.value;

  //Inputs validation
  if (!taskTitle || !taskCategory || !taskDueDate) {
    alert("Please complete all required fields.");
    return;
  }

  //Create a task object if all required fields are filled
  const taskRecord = {
    title: taskTitle,
    category: taskCategory,
    deadline: taskDueDate,
    status: taskState,
  };

  taskRepository.push(taskRecord);
}

//Generate task list in specified container
function populateTaskContainer(
  containerElement,
  statusFilter = "All",
  categoryFilter = "All"
) {
  containerElement.innerHTML = "";
  const today = new Date();
  let tasksFound = false;
  //Iterates over every task in the taskRepository array
  taskRepository.forEach((taskItem, taskIndex) => {
    const dueDate = new Date(taskItem.deadline);

    // Auto-update status only if not manually completed
    if (taskItem.status !== "Completed" && dueDate < today) {
      taskItem.status = "Overdue";
    }
    //Filter tasks by status and category, then render matching tasks to the container

    const matchesStatus =
      statusFilter === "All" || taskItem.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All" || taskItem.category === categoryFilter;

    if (matchesStatus && matchesCategory) {
      tasksFound = true;
      const taskElement = createTaskElement(taskItem, taskIndex);
      containerElement.appendChild(taskElement);
    }
    //Show fallback message if no tasks matched the selected filters

    if (!tasksFound) {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "No matching tasks found.";
      containerElement.appendChild(emptyMessage);
    }
  });
}
