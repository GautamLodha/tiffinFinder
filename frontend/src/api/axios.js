import axios from "axios";

const API = axios.create({
  baseURL: "https://chefstream.onrender.com",
});

export default API;