import { useState } from "react";

const ToDOList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addtask = () => {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  };

  const DeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };    

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div className="add-btn">
        <input
          type="text"
          placeholder="Enter a task....."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addtask}>
          Add
        </button>
      </div>
      

      <ul>
        {tasks.map((task, index) => (
          <>
            <li key={index}>
              <span className="text">{task}</span>
              <button className="delete-btn" onClick={() => DeleteTask(index)}>
                Delete
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default ToDOList;
