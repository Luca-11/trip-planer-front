<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const location = ref("");
const router = useRouter();
const route = useRoute();

const go = async () => {
  try {
    const response = await axios.post("http://localhost:3000/v1/itinerary", {
      prompt: location.value,
    });
    router.push(`/${response.data.id}`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <input type="text" placeholder="Enter a location" />
    <div class="btn">
      <button class="go" @click="go">C'est parti</button>
      <button class="exemple">Voir un exemple</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 0 64px 0;
}

input {
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
