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
  persistTasks();
  resetTaskForm();
  refreshCategorySelections();
  renderPrimaryTaskView();
}
//Shows all tasks in main container
function renderPrimaryTaskView() {
  populateTaskContainer(taskContainer);
}
//Shows filtered tasks in secondary container

function renderFilteredTaskView(
  statusSelection = "All",
  categorySelection = "All"
) {
  populateTaskContainer(
    filteredTaskContainer,
    statusSelection,
    categorySelection
  );
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
  });
  //Show fallback message if no tasks matched the selected filters

  if (!tasksFound) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No matching tasks found.";
    containerElement.appendChild(emptyMessage);
  }
  persistTasks();
}
//Create individual task DOM element
function createTaskElement(taskData, indexPosition) {
  //Create the main list item node to display task info
  const taskNode = document.createElement("li");
  //Set the text content to show task title, category, and deadline
  taskNode.textContent = `${taskData.title} - ${taskData.category} - ${taskData.deadline} - `;
  //Create a dropdown to allow changing the task status
  const statusSelector = document.createElement("select");
  // Add options to the dropdown for each possible status
  ["In Progress", "Completed", "Overdue"].forEach((optionValue) => {
    const choice = new Option(optionValue, optionValue);
    choice.selected = taskData.status === optionValue; // Mark current status as selected
    statusSelector.appendChild(choice);
  });
  //Update task status in the repository when a new status is selected
  statusSelector.addEventListener("change", (selectionEvent) => {
    taskRepository[indexPosition].status = selectionEvent.target.value;
    persistTasks();
    renderPrimaryTaskView();
  });
  //Append the status dropdown to the task node
  taskNode.appendChild(statusSelector);
  // Return the fully built task element
  return taskNode;
}
// Refresh the category dropdown with unique values from existing tasks
function refreshCategorySelections() {
  const categoryFilter = document.getElementById("categoryFilter"); // Get the category filter dropdown
  const currentFilter = categoryFilter.value; // Save the currently selected category

  //Create a list of available categories, including "All" annd unique categories from taskRepository
  const availableCategories = [
    "All",
    ...new Set(taskRepository.map((task) => task.category)),
  ];

  // Clear existing options in the dropdown
  categoryFilter.innerHTML = "";

  //Rebuild dropdown options with updated category list
  availableCategories.forEach((category) => {
    //Create a new <option> element
    const filterOption = new Option(category, category);
    // Keep previous selection if still valid
    if (category === currentFilter) filterOption.selected = true;
    categoryFilter.add(filterOption); // Add option to dropdown
  });
}
//Clears the task input form
function resetTaskForm() {
  newTaskNameField.value = "";
  newTaskCategoryField.value = "";
  newTaskDeadlineField.value = "";
  newTaskStatusField.value = "In Progress";
}
//Saves tasks to persistent storage
function persistTasks() {
  localStorage.setItem("taskStorage", JSON.stringify(taskRepository));
}
// Bind click event to "Add Task" button to trigger task creation
document
  .getElementById("addTaskButton")
  .addEventListener("click", processNewTask);

//Bind click event to "Filter" button to apply selected filters
document.getElementById("filterButton").addEventListener("click", () => {
  // Get selected task status
  const selectedStatus = document.getElementById("filter").value;
  const selectedCategory = document.getElementById("categoryFilter").value; // Get selected task category

  //Call function to display tasks matching selected filters
  renderFilteredTaskView(selectedStatus, selectedCategory);
});
// Initial setup
refreshCategorySelections();
renderPrimaryTaskView();
