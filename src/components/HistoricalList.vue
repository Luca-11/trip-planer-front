<script setup>
import { onMounted, ref } from "vue";

// Creating a reactive reference for itinerary
const itinerary = ref([]);
const url_api = import.meta.env.VITE_APP_URL_API;

// Function to fetch itinerary from the server
const fetchItinerary = async () => {
  const response = await fetch(`${url_api}/v1/itinerary`);
  const data = await response.json();
  // data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  itinerary.value = data;
  console.log(data);
};

// Function to be executed when the component is mounted
onMounted(() => {
  fetchItinerary();
});
</script>

<template>
  <div>
    <h3>Derniers itinéraires</h3>

    <div
      class="historic-main"
      v-for="item in itinerary.slice(-4)"
      :key="item.id"
    >
      <RouterLink :to="`/${item.id}`" class="btn">
        <p>{{ item.prompt }}</p>

        <img src="@/assets/icons/arrow.png" alt="arrow" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.historic-main {
  display: flex;
  justify-content: space-between;
  background-color: #242321;
  border-radius: 5px;
  color: white;
  align-items: center;
  font-size: 14px;
  margin: 1rem 0;
}

.btn {
  display: flex;
  background-color: #242321;
  border-radius: 5px;
  color: white;
  align-items: center;
  font-size: 14px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  text-decoration: none;
}

.btn p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

img {
  width: 32px;
  height: 32px;
}
</style>
