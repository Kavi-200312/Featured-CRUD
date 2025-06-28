import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://crudappproject007.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptors for auth or logging
apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject({
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export default apiClient;
