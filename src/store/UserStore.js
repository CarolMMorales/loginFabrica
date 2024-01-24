import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../axiosClient.js";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);
  const nameUser = ref(null);


  const access = async (email, password) => {
    try {
      console.log("ingreso");
      const res = await axiosClient.post("login", {
        email: email,
        password: password,
      });
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", "😰");
      setTime();

    } catch (error) {

      if (error.response) {

        throw (error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("error", error.mesagge);
      }
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log("ingreso");
      const res = await axiosClient.post("register", {
        name: name,
        email: email,
        password: password,

      });
      // Almacena el token, tiempo de expiración y nombre del usuario
      
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      console.log(name);
      nameUser.value = name;
      sessionStorage.setItem("user", "😰");
      setTime();
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("error", error.message);
      }
    }
  };

 // Función para cerrar la sesión del usuario

 const logout  = async()=>{
  try{
    await axiosClient.get("auth/logout")
    
  }catch(error){
    console.log(error)
  }finally{
    resetStore();
    sessionStorage.removeItem("user");
  }
 }

 // Función para configurar un temporizador de refresco del token
  const setTime = () => {
    setTimeout(() => {
      console.log("se refresco");
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };
// Función para refrescar el token
  const refreshToken = async () => {
    try {
      const res = await axiosClient.get("auth/refresh");
      console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      setTime();
    } catch (error) {
      console.error(error);
      console.log("No ingreso 🤦‍♀️🤦‍♀️");
    }
  };
// Función para restablecer el estado del almacén
  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };

  return {
    token,
    expiresIn,
    nameUser,
    access,
    refreshToken,
    logout,
    register,
  };
});
