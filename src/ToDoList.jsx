import { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };
// Add a new task to the list
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };
// Edit a task in the list
  const editTask = (index) => {
    setNewTask(tasks[index]); // Set the input field with the current task
    setEditingIndex(index); // Track which task is being edited
  };
// Update the task in the list
  const updateTask = () => {
    if (newTask.trim() !== "" && editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTask;
      setTasks(updatedTasks);
      setNewTask("");
      setEditingIndex(null);
    }
  };
// Delete a task from the list
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div className="add-btn">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        {editingIndex !== null ? (
          <button className="update-button" onClick={updateTask}>Update</button>
        ) : (
          <button className="add-button" onClick={addTask}>Add</button>
        )}
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
