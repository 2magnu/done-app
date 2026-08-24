<script setup lang="ts">
const notesStore = useNotesStore()

const showDeleteModal = ref(false)

function toggleModal() {
  showDeleteModal.value = !showDeleteModal.value
}

function confirmDelete(id: string) {
  notesStore.deleteNote(id)

  toggleModal()
}
</script>

<template>
  <div class="notes-app">
    <template v-if="notesStore.hasNotes">
      <input type="text" placeholder="Найти заметку" />

      <ul>
        <li v-for="note in notesStore.notes" :key="note.id">
          {{ note.title }}

          <ul>
            <li v-for="todo in note.todos" :key="todo.id">
              {{ todo.text }}
            </li>
          </ul>

          <nuxt-link :to="`/notes/${note.id}`">Редактировать</nuxt-link>

          <button type="button" @click="confirmDelete(note.id)">Удалить</button>
        </li>
      </ul>

      <BaseModal v-if="showDeleteModal" @close="toggleModal">
        Вы уверены, что хотите удалить заметку? Это действие нельзя будет отменить. Удалить
        <button @click="toggleModal">Отменить</button>
      </BaseModal>
    </template>

    <template v-else>
      <p>Ничего не найдено</p>
    </template>

    <NuxtLink to="/notes/new"> Создать заметку </NuxtLink>
  </div>
</template>

<style scoped lang="scss"></style>
