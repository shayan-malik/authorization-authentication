import axios from "axios";

const api = axios.create({
    baseURL: "https://authorization-khaki.vercel.app", withCredentials: true
});

export default api;