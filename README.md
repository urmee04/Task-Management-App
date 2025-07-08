## SBA 4: Task Management App

### Project Overview

The **Task Management App** is a browser-based application that allows users to:

- Add new tasks with a name, category, deadline, and status.
- Automatically update the status of overdue tasks.
- Filter tasks by status or category.
- Persist tasks using **localStorage**, so data is saved even after a page refresh.

This project demonstrates the use of core JavaScript concepts such as:

- Arrays and objects
- DOM manipulation
- Conditional logic
- Event handling
- The Local Storage API

---

#### Features

1. Add new tasks with:

- Task Name

- Category

- Deadline

- Status (In Progress, Completed)

2. Automatically mark tasks as Overdue if the deadline has passed

3. Update task status dynamically via dropdown

4. Filter tasks by status and category

5. Display both full task list and filtered results in separate sections

6. Persist task data using localStorage

#### Tech Stack

- HTML5 – Page structure and forms

- CSS3 – Visual styling and layout

- JavaScript (ES6) – App logic and interactivity

- Local Storage API – Persistent data storage

### Project Structure

```
Task-Management-App/
│
├── index.html        # Main HTML structure
├── style.css        # Styling for layout, buttons, and task list
├── index.js         # JavaScript logic for task handling and filtering
└── README.md         # Project documentation
```

### How to Use

- Clone or download the repository

```bash
git clone https://github.com/urmee04/Task-Management-App.git
```

- Open the index.html file in your browser.

- Add tasks using the form inputs.

- Use the dropdowns and Filter button to view specific tasks.

- Task data will automatically be saved and restored using your browser’s localStorage.

### How to Check If Localtoreage is Working

#### Open Developer Tools

- Right-click on the page → Click **Inspect** → Go to the **Console** tab.

#### Check Stored Tasks

Run this in the Console:

```js
const taskRepository = JSON.parse(localStorage.getItem("taskStorage")) || [];
console.log(taskRepository);
```

#### Check localStorage Directly

```js
console.log(localStorage.getItem("taskSorage"));
```

If it logs null, it means there’s no 'taskStorage' key in localStorage yet.

#### Reflection

**1. Challenges faced during the project.**

- Ensuring that filtering did not overwrite the original task list

- Implementing real-time status updates (In Progress → Overdue) based on deadline comparisons

- Keeping the UI updated and in sync with localStorage without full-page refreshes

**2. How you approached solving those challenges.**

- Established distinct rendering targets (taskContainer and filteredTaskContainer)

- Implemented date validation in populateTaskContainer() using new Date() comparisons

- Structured the codebase with focused functions:

1. processNewTask() for task creation

2. renderPrimaryTaskView() for main display

3. renderFilteredTaskView() for filtered results

4. persistTasks() for storage synchronization

**3. What you would improve if given more time.**

- Add task editing and deletion for better task management

- Introduce visual indicators for overdue and completed tasks

- Consider using a front-end framework like React for better state handling and scalability

##### Resources

- [MDN Web Docs - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

- [JavaScript Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

- [HTML Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)

- [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
