import axios from 'axios';
/* This file defines an API service using the axios library to handle HTTP requests to the backend server. It sets up a base URL for all requests and includes an interceptor to automatically attach the JWT token from localStorage to the Authorization header of each request. The file exports functions for user authentication (login and register) and CRUD operations for tasks (getTasks, createTask, updateTask, toggleTask, deleteTask). These functions can be imported and used throughout the frontend application to interact with the backend API. */
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL
});

/* The request interceptor is a function that runs before each HTTP request is sent. It checks if there is a token stored in localStorage and, if so, it adds an Authorization header with the token to the request configuration. This ensures that all requests to protected endpoints include the necessary authentication token without requiring manual intervention in each API call. If there is an error in the request configuration, it rejects the promise with the error. */
api.interceptors.request.use((config) => {
  /* Retrieve the JWT token from localStorage and attach it to the Authorization header of the request if it exists. This allows the backend to authenticate the user for protected routes. The token is prefixed with "Bearer " to indicate that it is a Bearer token, which is a common convention for JWT authentication. */
  const token = localStorage.getItem('token');
  /*  If a token is found, it is added to the request headers under the Authorization field.
   This way, every request made using this axios instance will automatically include the token,
    allowing the backend to verify the user's identity and permissions. If no token is found,
     the request proceeds without the Authorization header. */
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  /*  If there is an error in the request configuration, the interceptor will reject the promise with the error. This allows any component that makes an API call to handle the error appropriately, such as displaying an error message to the user or logging the error for debugging purposes. */
  return Promise.reject(error);
});
/* The following functions are defined to interact with the backend API for user authentication and task management. Each function corresponds to a specific API endpoint and HTTP method, allowing the frontend to perform actions such as logging in, registering, fetching tasks, creating new tasks, updating existing tasks, toggling task completion status, and deleting tasks. These functions return the result of the axios request, which can be used in the components to update the UI based on the response from the server. */
export const login = (data) => api.post('/auth/login', data);

/*  The register function sends a POST request to the /auth/register endpoint with the provided user data (such as name, email, and password) to create a new user account. The login function sends a POST request to the /auth/login endpoint with the user's credentials (email and password) to authenticate the user and retrieve a JWT token. Both functions return the result of the axios request, which can be used in the frontend components to handle user authentication and account creation processes. */
export const register = (data) => api.post('/auth/register', data);

/*  The following functions are defined to interact with the backend API for task management. Each function corresponds to a specific API endpoint and HTTP method, allowing the frontend to perform actions such as fetching all tasks, creating new tasks, updating existing tasks, toggling task completion status, and deleting tasks. These functions return the result of the axios request, which can be used in the components to update the UI based on the response from the server. */
export const getTasks = () => api.get('/tasks');

/*  The getTasks function sends a GET request to the /tasks endpoint to retrieve a list of all tasks associated with the authenticated user. The createTask function sends a POST request to the /tasks endpoint with the task data to create a new task. The updateTask function sends a PUT request to the /tasks/:id endpoint with the updated task data to modify an existing task. The toggleTask function sends a PATCH request to the /tasks/:id endpoint with the next completion state to toggle the completion status of a task. The deleteTask function sends a DELETE request to the /tasks/:id endpoint to remove a task from the user's list. Each function returns the result of the axios request, allowing the frontend components to handle task management operations effectively. */
export const createTask = (data) => api.post('/tasks', data);

/*  The createTask function sends a POST request to the /tasks endpoint with the task data to create a new task. The updateTask function sends a PUT request to the /tasks/:id endpoint with the updated task data to modify an existing task. The toggleTask function sends a PATCH request to the /tasks/:id endpoint with the next completion state to toggle the completion status of a task. The deleteTask function sends a DELETE request to the /tasks/:id endpoint to remove a task from the user's list. Each function returns the result of the axios request, allowing the frontend components to handle task management operations effectively. */
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

/*  The updateTask function sends a PUT request to the /tasks/:id endpoint with the updated task data to modify an existing task. The toggleTask function sends a PATCH request to the /tasks/:id endpoint with the next completion state to toggle the completion status of a task. The deleteTask function sends a DELETE request to the /tasks/:id endpoint to remove a task from the user's list. Each function returns the result of the axios request, allowing the frontend components to handle task management operations effectively. */
export const toggleTask = (id, data) => api.patch(`/tasks/${id}`, data);

/*  The toggleTask function sends a PATCH request to the /tasks/:id endpoint with the next completion state to toggle the completion status of a task. The deleteTask function sends a DELETE request to the /tasks/:id endpoint to remove a task from the user's list. Each function returns the result of the axios request, allowing the frontend components to handle task management operations effectively. */
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

/* Finally, the api instance is exported as the default export of the module, allowing other parts of the application to import and use it for making HTTP requests to the backend server. This centralizes the API configuration and makes it easier to manage and maintain the codebase. */
export default api;