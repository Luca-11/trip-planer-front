<script setup>
// Importing necessary modules from vue, vue-router and components
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Map from "@/components/Map.vue";
import Popup from "@/components/Popup.vue";

const itinerary = ref([]);
const popup = ref(null);
const router = useRouter();

// Function to fetch itinerary by id from the server
const fetchItineraryById = async (id) => {
  const response = await fetch(`http://localhost:3000/v1/itinerary/${id}`);
  const data = await response.json();
  itinerary.value = data;
  console.log(data);
};

// Function to be executed when the component is mounted
onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;
  await fetchItineraryById(id);
});
</script>

<template>
  <Map />
  <main>
    <div class="top-trip">
      <div class="left">
        <h2>{{ itinerary.prompt }}</h2>
      </div>

      <div class="right">
        <img
          src="@/assets/icons/edit.png"
          alt="edit"
          @click="popup.openPopup(itinerary)"
        />

        <Popup ref="popup" @update="(id) => fetchItineraryById(id)" />
      </div>
    </div>
    <div>
      <h3 class="title-trip">Itinéraire</h3>
      <ul class="numbered-list">
        <li v-for="(item, index) in itinerary.iaResponse" :key="index">
          <div class="number">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="step">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 30px 20px;
}

.top-trip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
}

.left {
  width: 80%;
}

.right {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.top-trip img {
  width: 45px;
  height: 45px;
}

.title-trip {
  color: #958f7e;
}

h2 {
  color: white;
  font-size: 16px;
  margin: 0;
  padding: 0;
  font-family: "Lora-Bold";
  display: flex;
  text-align: left;
}

h3 {
  color: white;
  font-size: 16px;
  margin: 0;
  padding: 0;
  font-family: "Lora-SemiBold";
  display: flex;
  text-align: left;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  margin: 20px 0;
}

.number {
  font-size: 40px;
  color: #958f7e;
  width: 10%;
}

.step {
  width: 90%;
}

.step p {
  font-size: 11px;
  margin: 0;
  padding: 10px 0;
  font-family: "Lora";
  color: #cecece;
}

@media (min-width: 768px) {
  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 24px;
  }

  .step {
    width: 100%;
  }

  .step p {
    font-size: 16px;
  }

  .number {
    font-size: 56px;
  }
}
</style>
