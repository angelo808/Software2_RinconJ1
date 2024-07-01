import axios from "axios";
import { API_URL } from "../constants";

const axiosBase = axios.create({
  baseURL: API_URL,
});

export default axiosBase;
