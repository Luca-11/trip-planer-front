<script setup>
import { onMounted, ref } from "vue";

const itinerary = ref([]);

const fetchItinerary = async () => {
  const response = await fetch("http://localhost:3000/v1/itinerary");
  const data = await response.json();
  itinerary.value = data;
};

onMounted(() => {
  fetchItinerary();
});
</script>

<template>
  <div>
    <h1>Itinerary</h1>
  </div>
</template>

<style scoped></style>
