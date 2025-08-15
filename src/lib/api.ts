import axios from "axios";

const api = axios.create({
  baseURL: "https://688ddb83a459d5566b135c4a.mockapi.io/",
});

export default api;
