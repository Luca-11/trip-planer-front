<script setup>
import { ref } from "vue";

const showPopup = ref(false);

// Defining an emit function for the "prompt-update" event
// const emit = defineEmits(["prompt-update"]);

// Function to open the popup and set the new prompt
const openPopup = (itinerary) => {
  showPopup.value = true;
  // newPrompt.value = itinerary.prompt;
};

// Function to close the popup
const closePopup = () => {
  showPopup.value = false;
};

// Exposing the openPopup function
defineExpose({
  openPopup,
});
</script>

<template>
  <div v-if="showPopup" class="popup" @click="closePopup">
    <div class="popup-content" @click.stop>
      <slot v-bind="{ openPopup, closePopup }"></slot>
    </div>
  </div>
</template>

<style scoped>
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

@media (min-width: 768px) {
  .popup-content {
    width: 90%;
    padding: 1rem;
  }
}
</style>
