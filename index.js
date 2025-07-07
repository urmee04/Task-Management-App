//DOM element references
const newTaskNameField = document.getElementById("taskName");
const newTaskCategoryField = document.getElementById("category");
const newTaskDeadlineField = document.getElementById("deadline");
const newTaskStatusField = document.getElementById("status");
const taskContainer = document.getElementById("taskList");
const filteredTaskContainer = document.getElementById("filteredTaskList");

//Handle new tasks creation
function processNewTask() {}
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
