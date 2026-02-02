import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

//Request interceptor (istek gitmeden önce)
axiosInstance.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response interceptor (cevap gelince9
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    if (error.response) {
   
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      
      console.error('No response from server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;