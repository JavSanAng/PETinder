// import axios from 'axios';

// const makeRequest = axios.create({
//   baseURL: 'http://localhost:5090'
// });

// makeRequest.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// export { makeRequest };

import axios from 'axios';
const baseURL = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:5090';

const makeRequest = axios.create({
  baseURL: baseURL,
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