<template>
  <div class="container_login">
    <div class="container_form">
      <div>
        <router-link to="/" class="logo_page">
          <img
            class="logo"
            src="../assets/logoPool.svg"
            alt="LogoAquaMantenimiento"
          />
          <span>AquaMantenimiento</span>
        </router-link>
      </div>
      <div class="title_container">
        <p class="title">Regístrate</p>
        <span class="subtitle">¡Únete a nosotros hoy!</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <br />
        <div class="input_container">
          <label class="input_label" for="password_field">Nombre</label>

          <input
            placeholder="Nombre"
            title="Input title"
            name="input-name"
            v-model="name"
            type="text"
            class="p-2 container-fluid form-control"
            id="password_field"
          />
        </div>

        <div class="input_container">
          <label class="input_label" for="email_field">Correo</label>
          <input
            placeholder="name@mail.com"
            v-model="email"
            title="Inpit title"
            name="input-name"
            type="text"
            class="p-2 container-fluid form-control"
            id="email_field"
          />
          <span class="error" v-if="!validateEmail(email)"
            >formato de correo incorrecto</span
          >
        </div>
        <div class="input_container">
          <label class="input_label" for="password_field">Contraseña</label>

          <input
            placeholder="Password"
            title="Inpit title"
            name="input-name"
            v-model="password"
            type="password"
            class="p-2 container-fluid form-control"
            id="password_field"
          />
          <span class="error" v-if="!validatePassword(password)">
            La contraseña debe tener al menos 6 caracteres, incluyendo al menos
            una letra mayúscula y un número.
          </span>
        </div>
        
        <button title="Sign In" type="submit" class="sign-in_btn btn btn-primary">
          <span>Regístrate</span>
        </button>
        <p class="note">Terms of use &amp; Conditions</p>
      </form>
    </div>
  </div>

  <!--modal -->
  <div>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Error del servidor</h2>
        <p v-if="serverError">{{ serverError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/UserStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const repassword = ref("");

const handleSubmit = async () => {
  try {
    await userStore.register(
      name.value,
      email.value,
      password.value,
      repassword.value
    );
    router.push("/protectedUser");
    name.value = " ";
    email.value = " ";
    password.value = " ";
    repassword.value = " ";
  } catch (error) {
    console.log(error);
    alertBackend(error.error);
  }
};
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

const isModalOpen = ref(false);
const serverError = ref("");
console.log(serverError.msg);
const alertBackend = (error) => {
  serverError.value = error;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
