<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <Carousel></Carousel>
      </div>
      <div class="col-md-6">
        <div class="card">
          <router-link to="/" class="logo_page d-flex align-items-center">
            <img class="logo" src="../assets/logoPool.svg" alt="LogoAquaMantenimiento">
            <span class="ms-2">AquaMantenimiento</span>
          </router-link>
          <h4>Si ya usas AquaMantenimiento:</h4>
          <router-link class="btn btn-primary" to="/login">Inicia sesión</router-link>
          <h4>Si es tu primera vez usando AquaMantenimiento:</h4>
          <router-link class="btn btn-success" to="/register">Crea una cuenta</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Carousel from "../components/Carousel.vue";
</script>
<style>

</style>
