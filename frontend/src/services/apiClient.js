import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust to your FastAPI port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;