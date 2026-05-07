import axios from "axios";

const API = axios.create({
  baseURL: "https://chef-stream.onrender.com", 
});

export default API;