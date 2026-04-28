import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8787/atsanalyzer/api/v1",
});
