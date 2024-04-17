<script setup>
// Importing necessary modules from vue, vue-router and axios
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Creating a reactive reference for location
const location = ref("");

// Using vue-router to get router instance
const router = useRouter();

// Function to make a POST request to the server
const go = async () => {
  try {
    // Making a POST request to the server with the location value
    const response = await axios.post("http://localhost:3000/v1/itinerary", {
      prompt: location.value,
    });
    // Navigating to a new route with the id returned from the server
    router.push(`/${response.data.id}`);
  } catch (error) {
    // Logging any error that occurs during the request
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <!-- Textarea for user to input location, bound to location ref -->
    <textarea
      v-model="location"
      type="text"
      placeholder="Enter a location"
    ></textarea>
    <!-- Button to trigger the go function -->
    <div class="btn">
      <!-- Button to trigger the go function -->
      <button class="go" @click="go">C'est parti</button>
      <button class="exemple">Voir un exemple</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 0 64px 0;
}

textarea {
  background-color: #242321;
  width: -webkit-fill-available;
  padding: 1rem;
  padding-bottom: 15vh;
  margin: 1rem 0;
  border: 1px solid #958f7e;
  border-radius: 5px;
  color: white;
}

.btn {
  display: flex;
  justify-content: space-between;
}

.go {
  background-color: #958f7e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

.exemple {
  background-color: #242321;
  color: #cecece;
  padding: 10px 20px;
  border: 1px solid #958f7e;
  border-radius: 5px;
}
</style>
