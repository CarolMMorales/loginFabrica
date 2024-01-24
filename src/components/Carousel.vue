<template>
    <!--liceth olmos-->
  <div class="carousel">
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="{ 'carousel-item': true, active: index === currentIndex }"
        >
          <img :src="image" class="d-block w-100" alt="Image" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentIndex = ref(0);
const images = [
  "/src/assets/img/carousel2.jpg",
  "/src/assets/img/carousel3.jpg",
  "/src/assets/img/carousel4.jpg",
];

const autoPlay = () => {
  if (currentIndex.value < images.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

onMounted(() => {
  setInterval(autoPlay, 4000); // Cambiar de imagen cada 3 segundos
});
</script>

