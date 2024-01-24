import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../axiosClient.js";
import { useUserStore } from "./UserStore.js";

export const useProtectedStore = defineStore("protectedStore", () => {
  const userStore = useUserStore();
  const nameUser = ref();

  const read_register = async () => {
    try {
      console.log("llamado name");
      const res = await axiosClient({
        url: "/categories",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      console.log(res.data.name);
      nameUser.value = res.data.name;
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  return {
    read_register,
    nameUser,
  };
});
