<script setup>
// Importing necessary modules from vue, vue-router and axios
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Loading from "@/components/Loading.vue";

const location = ref("");
const router = useRouter();
const isLoading = ref(false);

// Function to make a POST request to the server
const go = async () => {
  isLoading.value = true;
  try {
    const response = await axios.post("http://localhost:3000/v1/itinerary", {
      prompt: location.value,
    });
    router.push(`/${response.data.id}`);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div v-if="isLoading">
    <Loading />
  </div>
  <div v-else>
    <div class="container">
      <textarea
        v-model="location"
        type="text"
        placeholder="Enter a location"
      ></textarea>

      <div class="btn">
        <button class="go" @click="go">C'est parti</button>
        <button class="exemple">Voir un exemple</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 0 64px 0;
}

textarea {
  width: 100%;
  padding: 1rem;
  padding-bottom: 15vh;
  margin: 1rem 0;
  border: 1px solid #958f7e;
  border-radius: 5px;
  color: white;
  background-color: #242321;
  box-sizing: border-box;
}

.btn {
  display: flex;
  justify-content: space-between;
}

.go {
  padding: 10px 48px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #958f7e;
}

.exemple {
  padding: 10px 20px;
  border: 1px solid #958f7e;
  border-radius: 5px;
  color: #cecece;
  background-color: #242321;
}
</style>
