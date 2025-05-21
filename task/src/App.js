import React, { useState } from "react";
import './App.css'

const categories = ["All", "Work", "Personal", "Learning"];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (title.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title,
      category,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTitle("");
    setCategory("Work");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = filter === "All"
    ? tasks
    : tasks.filter((task) => task.category === filter);

  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="container">
      <h1>📋 Task Management Board</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.slice(1).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={clearCompleted}>Clear All Completed</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? "task completed" : "task"}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.title}</span>
            <small>({task.category})</small>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>

      <p className="footer">
        🟢 {remainingCount} task{remainingCount !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
};

export default App;
