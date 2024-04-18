<script setup>
import HistoricaList from "@/components/HistoricalList.vue";
import PromptBox from "@/components/PromptBox.vue";
</script>

<template>
  <header>
    <img src="@/assets/icons/compass.png" alt="logo" />
    <h1>
      Planificateur <br />
      de voyage
    </h1>
    <h2>généré par IA</h2>
  </header>

  <main>
    <PromptBox />
    <HistoricaList />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}

header img {
  width: 54px;
  height: 54px;
}

main {
  padding: 0 32px;
}
</style>
