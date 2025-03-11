import { useState } from "react";
import "./ToDoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      editingIndex !== null ? updateTask() : addTask();
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask("");
    }
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  const updateTask = () => {
    if (newTask.trim() !== "" && editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { 
        ...updatedTasks[editingIndex], 
        text: newTask.trim() 
      };
      setTasks(updatedTasks);
      setNewTask("");
      setEditingIndex(null);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { 
      ...updatedTasks[index], 
      completed: !updatedTasks[index].completed 
    };
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>To-Do List</h1>
        <p>{tasks.length} tasks, {tasks.filter(task => task.completed).length} completed</p>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {editingIndex !== null ? (
          <button className="update-button" onClick={updateTask}>
            Update
          </button>
        ) : (
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add a task to get started!</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span className="task-text">{task.text}</span>
              </div>
              <div className="task-actions">
                <button 
                  className="edit-button"
                  onClick={() => editTask(index)}
                  disabled={task.completed}
                >
                  Edit
                </button>
                <button 
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
