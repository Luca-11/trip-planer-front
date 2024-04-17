<script setup>
import router from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";
const showPopup = ref(false);
const newPrompt = ref("");

const route = useRoute();
const id = route.params.id;

const emit = defineEmits(["prompt-update"]);

const openPopup = (itinerary) => {
  showPopup.value = true;
  newPrompt.value = itinerary.prompt;
};

const closePopup = () => {
  showPopup.value = false;
};

const updatePrompt = async () => {
  try {
    await fetch(`http://localhost:3000/v1/itinerary/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: newPrompt.value }),
    });

    emit("prompt-update", id);

    // closePopup();
    router.push(`/${id}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

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
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: relative;
  background-color: #cecece;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  width: 70%;
  height: 30%;
  overflow: auto;
}

.popup textarea {
  background-color: #2f2e2b;
  width: -webkit-fill-available;
  padding: 32px 25px;
  border: 1px solid #958f7e;
  border-radius: 5px;
  color: white;
  font-family: "Lora";
}

.popup .btn {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.popup .go {
  background-color: #958f7e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup .go:disabled {
  background-color: #1a1815;
  color: #5f5f5f;
  cursor: not-allowed;
}

.popup .exemple {
  background-color: #242321;
  color: #cecece;
  padding: 10px 20px;
  border: 1px solid #958f7e;
  border-radius: 5px;
  margin-top: 1rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.update {
  background-color: #958f7e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

.update:disabled {
  background-color: #1a1815;
  color: #5f5f5f;
  cursor: not-allowed;
}

.cancel {
  background-color: inherit;
  color: #242321;
  padding: 10px 20px;
  border: 1px solid #958f7e;
  border-radius: 5px;
  margin-left: 1rem;
}
</style>
