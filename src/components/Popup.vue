<script setup>
import router from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";

const showPopup = ref(false);
const newPrompt = ref("");
const route = useRoute();
const id = route.params.id;

// Defining an emit function for the "prompt-update" event
const emit = defineEmits(["prompt-update"]);

// Function to open the popup and set the new prompt
const openPopup = (itinerary) => {
  showPopup.value = true;
  newPrompt.value = itinerary.prompt;
};

// Function to close the popup
const closePopup = () => {
  showPopup.value = false;
};

// Function to update the prompt
const updatePrompt = async () => {
  try {
    await fetch(`http://localhost:3000/v1/itinerary/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: newPrompt.value }),
    });

    // Emitting the "prompt-update" event with the id
    emit("prompt-update", id);

    // Navigating to the route with the id and reloading the page
    router.push(`/${id}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

// Exposing the openPopup function
defineExpose({
  openPopup,
});
</script>

<template>
  <div v-if="showPopup" class="popup" @click="closePopup">
    <div class="popup-content" @click.stop>
      <h2>Modifier le prompt</h2>

      <textarea v-model="newPrompt" rows="4" cols="50"></textarea>

      <div class="buttons">
        <button class="update" @click="updatePrompt">Mettre à jour</button>
        <button class="cancel" @click="closePopup">Annuler</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #cecece;
}

.popup {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: relative;
  width: 70%;
  height: auto;
  min-height: 30%;
  padding: 2rem;
  border-radius: 8px;
  background-color: #2f2e2b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  overflow: auto;
}

.popup textarea {
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

.popup .btn {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.popup .go {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #958f7e;
  color: white;
  cursor: pointer;
}

.popup .go:disabled {
  background-color: #1a1815;
  color: #5f5f5f;
  cursor: not-allowed;
}

.popup .exemple {
  padding: 10px 20px;
  border: 1px solid #958f7e;
  border-radius: 5px;
  margin-top: 1rem;
  background-color: #242321;
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

@media (min-width: 768px) {
  .popup-content {
    width: 90%;
    padding: 1rem;
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
