import axios from "axios";

const api = axios.create({
    baseURL: "https://authorization-khaki.vercel.app"
});

export default api;