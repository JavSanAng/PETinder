import axios from 'axios';

const makeRequest = axios.create({
  baseURL: 'http://localhost:5090', 
});

makeRequest.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export { makeRequest };