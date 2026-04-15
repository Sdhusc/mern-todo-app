import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../static/css/Dashboard.css";

function Dashboard() {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId,setEditId]=useState(null);
  const [editText,setEditText]=useState("");


  const navigate = useNavigate();


  const handleEdit=(task)=>
  {
    setEditId(task._id);
    setEditText(task.title);
  };

  const handleUpdate=async(id)=>
  {
    try 
    {
        const token=localStorage.getItem("token");

        await axios.put(
            `http://localhost:5000/api/tasks/${id}`,
            {title:editText},
            {
                headers :
                {
                    Authorization:`Bearer ${token}`
                }
            }
        );
        setEditId(null);
        setEditText("");
        fetchTasks();
    }
    catch(err)
    {
        console.log("error un update task : ",err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    } catch (err) {
      console.log("error in fetch task : ", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tasks", 
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      fetchTasks();

    } catch (err) {
      console.log("error in add task : ", err);
    }
  };

  const handleToggle = async (task) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (err) {
      console.log("error in toggle task : ", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (err) {
      console.log("error in del task : ", err); // ✅ FIXED
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
  
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
  
        <button type="submit">Add Task</button>
      </form>
  
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
  
            {editId === task._id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
  
                <button onClick={() => handleUpdate(task._id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  className="task-text"
                  onClick={() => handleToggle(task)}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
  
                <div className="task-buttons">
                  <button onClick={() => handleToggle(task)}>
                    {task.completed ? "Incomplete" : "Complete"}
                  </button>
  
                  <button onClick={() => handleEdit(task)}>Edit</button>
  
                  <button onClick={() => handleDelete(task._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
  
          </li>
        ))}
      </ul>
    </div>
  );


}

export default Dashboard;