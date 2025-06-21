import axios from "axios";

const breweryAxios = axios.create({
  baseURL: "http://localhost:5282",
});

export default breweryAxios;
