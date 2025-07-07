//DOM element references
const newTaskNameField = document.getElementById("taskName");
const newTaskCategoryField = document.getElementById("category");
const newTaskDeadlineField = document.getElementById("deadline");
const newTaskStatusField = document.getElementById("status");
const taskContainer = document.getElementById("taskList");
const filteredTaskContainer = document.getElementById("filteredTaskList");

//Handle new tasks creation
function processNewTask() {}
  const taskTitle= newTaskNameField.value.trim();
  const taskCategory= newTaskCategoryField.ariaValueMax.trim();
  const taskDueDate = newTaskDeadlineField.