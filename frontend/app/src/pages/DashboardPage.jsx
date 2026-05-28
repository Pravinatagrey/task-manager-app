import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from '../services/api';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
//import { useAuth } from '../context/AuthContext';


export default function DashboardPage() {
 
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('all');

/* fetch all tasks from the backend and update the state with the retrieved data. It also includes error handling to log any issues that occur during the fetch operation. The useEffect hook ensures that this function is called once when the component mounts, allowing the dashboard to display the most up-to-date list of tasks when the user accesses it. */  
  const fetchAllTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error matching database extraction arrays:', err);
    }
  };
/* useEffect hook to fetch all tasks when the component mounts */
  useEffect(() => {
    fetchAllTasks();
  }, []);

  /* Handler functions for adding, updating, toggling, and deleting tasks. Each function interacts with the corresponding API service and then refreshes the task list by calling fetchAllTasks to ensure the UI reflects the latest data from the backend. Error handling is included to log any issues that arise during these operations. */
  const handleAdd = async (taskData) => {
    try {
      await createTask(taskData);
      fetchAllTasks();
    } catch (err) {
      console.error(err);
    }
  };
/* handleUpdate function to update an existing task. It takes the task ID and the updated task data as parameters, calls the updateTask API service, and then refreshes the task list. If an error occurs during the update process, it logs the error to the console. After a successful update, it also resets the editTask state to null to exit edit mode. */
  const handleUpdate = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      setEditTask(null);
      fetchAllTasks();
    } catch (err) {
      console.error(err);
    }
  };
/* handleToggle function to toggle the completion status of a task. It takes the task ID and the next completion state as parameters, calls the toggleTask API service, and then refreshes the task list. If an error occurs during this process, it logs the error to the console. This function allows users to mark tasks as completed or pending directly from the task list. */
  const handleToggle = async (id, nextCompleteState) => {
    try {
      await toggleTask(id, { completed: nextCompleteState });
      fetchAllTasks();
    } catch (err) {
      console.error(err);
    }
  };
/* handleDelete function to delete a task. It takes the task ID as a parameter, calls the deleteTask API service, and then refreshes the task list. If an error occurs during the deletion process, it logs the error to the console. This function allows users to remove tasks from their list when they are no longer needed. */
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchAllTasks();
    } catch (err) {
      console.error(err);
    }
  };
/* filteredTasks is a derived state that filters the list of tasks based on the current filter selection (all, completed, pending). It uses the Array.prototype.filter method to create a new array of tasks that match the selected filter criteria. This allows the UI to display only the relevant tasks based on the user's choice in the FilterBar component. */
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed === true;
    if (filter === 'pending') return task.completed === false;
    return true;
  });
/* The return statement renders the dashboard page, which includes a Navbar at the top and a main content area that is divided into two sections: the task list and the task form. The task list section displays the filtered tasks using the TaskList component, while the task form section allows users to add new tasks or edit existing ones using the TaskForm component. The layout is responsive, with a grid system that adjusts based on screen size. The FilterBar component is included to allow users to change the filter criteria for displaying tasks. */
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar /> 
      <main className="max-w-10xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">To do tasks</h2>
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>
          <TaskList 
            tasks={filteredTasks} 
            onEdit={setEditTask} 
            onDelete={handleDelete} 
            onToggle={handleToggle} 
          />
        </div>
          <div className="md:col-span-1">
          <TaskForm 
            editTask={editTask} 
            onAdd={handleAdd} 
            onUpdate={handleUpdate} 
            onCancel={() => setEditTask(null)} 
          />
        </div>
      </main>
    </div>
  );
}