import axios from "axios";
const axiosClient = axios.create({
  //conexion base de datos api
  //liceth olmos
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
});

export default axiosClient;
