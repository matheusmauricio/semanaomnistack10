import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.5.10.54:3333',
});

export default api;