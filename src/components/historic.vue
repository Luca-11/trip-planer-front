<script setup>
// Importing necessary modules from vue
import { onMounted, ref } from "vue";

// Creating a reactive reference for itinerary
const itinerary = ref([]);

// Function to fetch itinerary from the server
const fetchItinerary = async () => {
  // Making a GET request to the server
  const response = await fetch("http://localhost:3000/v1/itinerary");
  // Parsing the response to JSON
  const data = await response.json();
  // Sorting the data by updated_at in descending order
  data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  // Updating the itinerary value with the sorted data
  itinerary.value = data;
  // Logging the data for debugging purposes
  console.log(data);
};

// Function to be executed when the component is mounted
onMounted(() => {
  // Fetching the itinerary
  fetchItinerary();
});
</script>

<template>
  <div>
    <!-- Title for the last itineraries -->
    <h3>Derniers itinéraires</h3>
    <!-- Loop over the last 4 items in the itinerary -->
    <div
      class="historic-main"
      v-for="item in itinerary.slice(-4)"
      :key="item.id"
    >
      <!-- Router link to the item's page -->
      <RouterLink :to="`/${item.id}`" class="btn">
        <!-- Displaying the item's prompt -->
        <p>{{ item.prompt }}</p>
        <!-- Arrow icon -->
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
  width: -webkit-fill-available;
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
