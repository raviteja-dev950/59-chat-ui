import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:9199/api" });
export default api;