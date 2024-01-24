<template>
  <div
    class="container d-flex flex-column align-items-center justify-content-center min-vh-100 m-4"
  >
    <div class="container_form">
      <div>
        <router-link to="/" class="d-flex align-items-center">
          <img
            class=""
            src="../assets/logoPool.svg"
            alt="Logo"
          />
          <span>Nombre</span>
        </router-link>
      </div>
      <div class="mt-5">
        <p class="fw-bold">Ingrese a su cuenta</p>
        <span class="">¡Bienvenido de nuevo! </span>
        <span>Por favor, inicia sesión.</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <br />

        <div class="m-2 pt-2">
          <label class="fw-bold m-2" for="email_field">Correo</label>
          <input
            placeholder="name@mail.com"
            v-model="email"
            title="Inpit title"
            name="input-name"
            type="email"
            class=" p-2 container-fluid form-control"
            id="email_field"
          />
          <span class="error" v-if="!validateEmail(email)"
            >formato de correo incorrecto</span
          >
        </div>
        <div class="m-2 pt-2">
          <label class="fw-bold m-2" for="password_field">Contraseña</label>

          <input
            placeholder="Password"
            title="Inpit title"
            name="input-name"
            v-model="password"
            type="password"
            class=" p-2 container-fluid form-control"
            id="password_field"
          />
          <span class="error" v-if="!validatePassword(password)">
            La contraseña debe tener al menos 6 caracteres.
          </span>
        </div>
        <button
          title="Sign In"
          type="submit"
          class="btn btn-primary btn-lg"
          @click="alertBackend"
        >
          <span>Ingresar</span>
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

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    console.log("paso las validaciones");
    await userStore.access(email.value, password.value);
    router.push("/protectedUser");
    console.log("ressss", res);
  } catch (error) {
    console.log("error", error);
    alertBackend(error);
  }
};
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

const isModalOpen = ref(false);
const serverError = ref("");

const alertBackend = (error) => {
  serverError.value = error;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
<style>
/* Estilos para el formulario de inicio de sesión */

.container_form {
  max-width: 450px;
  padding: 2rem;
  box-shadow: 0px 106px 42px rgba(0, 0, 0, 0.01),
    0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
    0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.input_container {
  margin: 20px 20px;
}

.input_label {
  font-weight: bold;
}

.iinput_field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.error {
  color: rgb(42, 42, 43);
  font-size: 0.8rem;
}

.sign-in_btn {
  background-color: var(--background--button--color);
  padding: 10px 20px;
  width: 40%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.note {
  text-align: center;
  margin-top: 5px;
}

/* Estilos para la ventana modal */
/* Estilo para el fondo oscuro detrás del modal */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}

/* Estilo para el modal en sí */
.modal-content {
  background-color: #fff;
  margin: 2%;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  height: 30%;
  position: relative;
  border-radius: 10px;
}

/* Estilo para el botón de cierre */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>
