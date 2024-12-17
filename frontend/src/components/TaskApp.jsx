import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      await axios.post(API_URL, { task });
      setTask('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();  // Refresh tasks after deletion
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-green-500">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md mx-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          To-Do List
        </h1>

        {/* Task Input Form */}
        <form onSubmit={addTask} className="flex mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-4 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-r-lg transition-all duration-300"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.map((t) => (
            <li
              key={t._id}
              className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex justify-between items-center"
            >
              <span className="text-xl text-gray-700">{t.task}</span>
              <button
                onClick={() => deleteTask(t._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskApp;
