<script setup lang="ts">
const notesStore = useNotesStore()
</script>

<template>
  <div class="notes-app">
    <template v-if="notesStore.hasNotes">
      <input type="text" placeholder="Найти заметку">

      <ul>
        <li v-for="note in notesStore.notes" :key="note.id">
          {{ note.title }}
          <ul>
            <li v-for="todo in note.todos" :key="todo.id">
              {{ todo.text }}
            </li>
          </ul>
        </li>
      </ul>
    </template>

    <template v-else>
      <p>Ничего не найдено</p>
    </template>

    <NuxtLink to="/notes/new"> Создать заметку </NuxtLink>
  </div>
</template>

<style scoped lang="scss"></style>
