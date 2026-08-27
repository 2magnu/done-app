<script setup lang="ts">
const notesStore = useNotesStore()

onMounted(() => {
  notesStore.loadNotes()
})

const route = useRoute()

const isNotePage = computed(() => {
  return route.name === 'notes-id'
})
</script>

<template>
  <div class="app">
    <AppHeader :is-note-page="isNotePage" />

    <main class="main" :class="{ 'note-page': isNotePage }">
      <div class="container">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding-block: 24px;

  @include desk() {
    padding-block: 40px;
  }
}
</style>
