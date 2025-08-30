import axios from "axios";

const api = axios.create({
  baseURL: "https://global-warming.org/api",
  timeout: 20000,
});

export const fetchTemperature = () => api.get("/temperature-api").then(r => r.data);
export const fetchCO2         = () => api.get("/co2-api").then(r => r.data);
export const fetchMethane     = () => api.get("/methane-api").then(r => r.data);
export const fetchNitrous     = () => api.get("/nitrous-oxide-api").then(r => r.data);
export const fetchArctic      = () => api.get("/arctic-api").then(r => r.data);
