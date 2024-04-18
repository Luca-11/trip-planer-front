<script setup>
// Importing necessary modules from vue, vue-router and components
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Map from "@/components/Map.vue";
import Popup from "@/components/Popup.vue";
import Loading from "@/components/Loading.vue";

const itinerary = ref({});
const popup = ref(null);
const router = useRouter();
const newPrompt = ref("");
const isLoading = ref(false);

// Function to fetch itinerary by id from the server
const fetchItineraryById = async (id) => {
  const response = await fetch(`http://localhost:3000/v1/itinerary/${id}`);
  const data = await response.json();
  itinerary.value = data;
  newPrompt.value = data.prompt;
  console.log(data);
};

// Function to update the prompt
const updatePrompt = async (id) => {
  isLoading.value = true;
  try {
    await fetch(`http://localhost:3000/v1/itinerary/${itinerary.value.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: newPrompt.value }),
    });

    // Navigating to the route with the id and reloading the page
    // router.push(`/${id}`);
    // router.push({ name: 'single', params: { id } );
    // window.location.reload();
    await fetchItineraryById(id);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Function to be executed when the component is mounted
onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;
  await fetchItineraryById(id);
});
</script>

<template>
  <div class="load" v-if="isLoading">
    <Loading />
  </div>
  <div v-else>
    <Map v-if="itinerary.iaResponse" :locations="itinerary.iaResponse" />
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
          <Popup ref="popup" @update="(id) => fetchItineraryById(id)">
            <template #default="{ closePopup }">
              <h2>Modifier le prompt</h2>
              <textarea v-model="newPrompt" rows="4" cols="50"></textarea>
              <div class="buttons">
                <button class="update" @click="updatePrompt">
                  Mettre à jour
                </button>
                <button class="cancel" @click="closePopup">Annuler</button>
              </div>
            </template>
          </Popup>
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
  </div>
</template>

<style scoped>
main {
  height: 60vh;
  overflow: scroll;
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
  gap: 16px;
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

h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #cecece;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.update {
  padding: 16px 24px;
  border: none;
  background-color: #958f7e;
  color: white;
  font-family: "Lora-Bold";
  transition: transform 0.1s ease;
}

.update:disabled {
  background-color: #1a1815;
  color: #5f5f5f;
  cursor: not-allowed;
  transform: none;
}

.cancel {
  padding: 16px 16px;
  border: 1px solid #958f7e;
  background-color: inherit;
  color: #cecece;
  transition: transform 0.1s ease;
}

.update:active,
.cancel:active {
  transform: scale(0.95);
}

.cancel:disabled {
  transform: none;
}

textarea {
  width: 100%;
  padding: 24px 16px;
  border: 1px solid #958f7e;
  border-radius: 5px;
  background-color: #242321;
  color: white;
  box-sizing: border-box;
  font-family: "Lora";
  font-size: 16px;
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

  .update,
  .cancel {
    padding: 10px 20px;
  }

  h2 {
    font-size: 20px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .update,
  .cancel {
    margin-top: 10px;
  }
}
</style>
