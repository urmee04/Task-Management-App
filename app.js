    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add new task
    function addTask() {
      const taskName = document.getElementById('taskName').value.trim();
      const category = document.getElementById('category').value.trim();
      const deadline = document.getElementById('deadline').value;
      const status = document.getElementById('status').value;

      if (!taskName || !category || !deadline) {
        alert('Please fill in all fields.');
        return;
      }

      const task = { name: taskName, category, deadline, status };
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      clearInputFields();
      updateCategoryFilterOptions();
      displayTasks();
    }

    // Display tasks with filters
    function displayTasks(statusFilter = 'All', categoryFilter = 'All') {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      let matchFound = false;

      tasks.forEach((task, index) => {
        const currentDate = new Date();
        const taskDeadline = new Date(task.deadline);

        if (task.status !== 'Completed' && taskDeadline < currentDate) {
          task.status = 'Overdue';
        }

        const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;

        if (matchesStatus && matchesCategory) {
          matchFound = true;

          const listItem = document.createElement('li');
          listItem.textContent = `${task.name} - ${task.category} - ${task.deadline} - `;

          const statusSelect = document.createElement('select');
          ['In Progress', 'Completed', 'Overdue'].forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.text = optionText;
            if (task.status === optionText) option.selected = true;
            statusSelect.appendChild(option);
          });

          statusSelect.addEventListener('change', e => {
            tasks[index].status = e.target.value;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks(statusFilter, categoryFilter);
          });

          listItem.appendChild(statusSelect);
          taskList.appendChild(listItem);
        }
      });

      if (!matchFound) {
        const noMatch = document.createElement('li');
        noMatch.textContent = 'No tasks match your filters.';
        taskList.appendChild(noMatch);
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayFilteredTasks(statusFilter = 'All', categoryFilter = 'All') {
  const filteredList = document.getElementById('filteredTaskList');
  filteredList.innerHTML = '';
  let matchFound = false;

  tasks.forEach((task) => {
    const currentDate = new Date();
    const taskDeadline = new Date(task.deadline);

    if (task.status !== 'Completed' && taskDeadline < currentDate) {
      task.status = 'Overdue';
    }

    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;

    if (matchesStatus && matchesCategory) {
      matchFound = true;

      const listItem = document.createElement('li');
      listItem.textContent = `${task.name} - ${task.category} - ${task.deadline} - ${task.status}`;
      filteredList.appendChild(listItem);
    }
  });

  if (!matchFound) {
    const noMatch = document.createElement('li');
    noMatch.textContent = 'No tasks match your filters.';
    filteredList.appendChild(noMatch);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


    // Update category filter dropdown dynamically
    function updateCategoryFilterOptions() {
      const categoryDropdown = document.getElementById('categoryFilter');
      const currentSelection = categoryDropdown.value;
      const categories = ['All', ...new Set(tasks.map(task => task.category))];

      categoryDropdown.innerHTML = '';
      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        if (cat === currentSelection) option.selected = true;
        categoryDropdown.appendChild(option);
      });
    }

    // Clear input fields
    function clearInputFields() {
      document.getElementById('taskName').value = '';
      document.getElementById('category').value = '';
      document.getElementById('deadline').value = '';
      document.getElementById('status').value = 'In Progress';
    }

    // Event listeners
    document.getElementById('addTaskButton').addEventListener('click', addTask);

   document.getElementById('filterButton').addEventListener('click', () => {
  const status = document.getElementById('filter').value;
  const category = document.getElementById('categoryFilter').value;
  displayFilteredTasks(status, category);
});


    // Initialize app on page load
    updateCategoryFilterOptions();
    displayTasks();
  