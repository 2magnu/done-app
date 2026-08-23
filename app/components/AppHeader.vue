<script setup lang="ts">
const notesStore = useNotesStore()

</script>

<template>
  <header class="app-header">
    <div class="app-header__container container">
      <NuxtLink to="/" class="app-header__logo">
        <h1>👾 Доне</h1>
      </NuxtLink>

      <span class="app-header__label">{{ `${notesStore.notes.length} заметок` }}</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  background-color: $white;
}
</style>