import axios from 'axios';

const api = axios.create({
    baseURL: "https://simplecruduser-backend.herokuapp.com/api",
});

export default api;