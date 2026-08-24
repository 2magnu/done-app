<script setup lang="ts">
const notesStore = useNotesStore()

onMounted(() => {
  notesStore.loadNotes()
})
</script>

<template>
  <div class="app">
    <AppHeader />

    <main>
      <div class="container">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.app {
  position: relative;
}
</style>
