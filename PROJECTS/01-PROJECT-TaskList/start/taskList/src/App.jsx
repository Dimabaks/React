import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");


  const [openSection, setOpenSection] = useState({
    taskList: false,
    tasks: true,
    completed: true,
  });

  function toggleSection(section) {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
    console.log(openSection);
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function completeTask(id) {
    setTasks(tasks.map(task => task.id == id ? {...task, completed: true} : task))
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a,b) => {
      if (sortType === "priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3
        }
        return sortOrder == "asc" ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority]
      } else {
        return sortOrder == "asc" ? new Date(a.deadline) - new Date(b.deadline) : new Date(b.deadline) - new Date(a.deadline)
      }
    })
  }

  function toggleSortOrder(type) {
    if(sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc")
    }
  }

  console.log(tasks);

  const activeTasks = sortTask(tasks.filter((task) => !task.completed));
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="app">
      <div className="task-container">
        <h1 className="">Task List with priority</h1>
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        {openSection.taskList && <TaskForm addTask={addTask} />}
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <div className="sort-controls">
          <button className={`sort-button ${sortType === "date" ? "active" : ""}`} onClick={() => toggleSortOrder("date")}>By Date {sortType === "date" && (sortOrder ==="asc" ? "\u2191" : "\u2193")}</button>
          <button className={`sort-button ${sortType === "priority" ? "active" : ""}`} onClick={() => toggleSortOrder("priority")}>By Priority {sortType === "priority" && (sortOrder ==="asc" ? "\u2191" : "\u2193")}</button>
        </div>
        {openSection.tasks && <TaskList deleteTask={deleteTask} completeTask={completeTask} activeTasks={activeTasks} />}
      </div>

      <div className="completed-task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.completed ? "open" : ""}`}
          onClick={() => toggleSection("completed")}
        >
          +
        </button>
        {openSection.completed && (
          <CompletedTaskList deleteTask={deleteTask} completedTasks={completedTasks} />
        )}
      </div>
      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("Low");
      setDeadline("");
    }
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        required
        onChange={(e) => {
          console.log(e.target.value);
          setTitle(e.target.value);
        }}
      />
      <select
        value={priority}
        onChange={(e) => {
          console.log(e.target.value);
          setPriority(e.target.value);
        }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        value={deadline}
        type="datetime-local"
        required
        onChange={(e) => {
          console.log(e.target.value);
          setDeadline(e.target.value);
        }}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList({ activeTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} completeTask={completeTask}/>
      ))}
    </ul>
  );
}

function CompletedTaskList({ completedTasks, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask}/>
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, completeTask }) {
  console.log(task.id)
  return (
    <li className={`task-item ${task.priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {task.title} <strong>{task.priority}</strong>
        </div>
        <div className="task-deadline">
          {new Date(task.deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!task.completed && <button className="complete-button" onClick={() => completeTask(task.id)}>Complete</button>}
        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition,conditional rendering, array methods (map,
        filter), event handling.
      </p>
    </footer>
  );
}
export default App;
