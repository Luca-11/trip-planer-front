<template>
  <div class="load">
    <div class="loading-container">
      <div class="spinner"></div>
      <div class="loading-text">Chargement...</div>
    </div>
  </div>
</template>

<style scoped>
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loading-container {
  position: relative;
  display: flex;
  width: 50%;
  height: fit-content;
  padding: 8px 24px;
  border-radius: 5px;
  background-color: #f3f3f3;
  justify-content: space-between;
  align-items: center;
}

.spinner {
  border: 5px solid #8e8e8e6c;
  border-top: 5px solid #242321;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

.loading-text {
  font-size: 16px;
  font-family: "Lora";
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
