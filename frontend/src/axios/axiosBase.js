import axios from "axios";
import queryString from "query-string";
import { API_URL } from "../constants";

const axiosBase = () => {
  return axios.create({
    baseURL: API_URL,
    paramsSerializer: (params) => queryString.stringify(params),
  });
};

export default axiosBase;

