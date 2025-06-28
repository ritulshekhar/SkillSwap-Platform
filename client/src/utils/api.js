import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // uses proxy from package.json
});

export default api;