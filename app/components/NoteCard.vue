<script setup lang="ts">
import type { Note } from '~/types/note'

const notesStore = useNotesStore()

const props = defineProps<{
  note: Note
}>()

const showDeleteModal = ref(false)

function confirmDelete() {
  notesStore.deleteNote(props.note.id)
  showDeleteModal.value = false
}

const completeAllTasks = computed(() => {
  return props.note.todos.length && props.note.todos.every((todo) => todo.completed)
})
</script>

<template>
  <article class="note-card">
    <div class="note-card__header">
      <h3 class="note-card__title">{{ props.note.title }}</h3>

      <span v-if="completeAllTasks" class="note-card__badge">Done</span>

      <span class="note-card__caption">{{ new Date().toLocaleDateString() }}</span>
    </div>

    <ul v-if="props.note.todos.length > 0" class="note-card__list">
      <li
        v-for="todo in props.note.todos.slice(0, 3)"
        :key="todo.id"
        class="note-card__list-item"
        :class="{ 'note-card__list-item--checked': todo.completed }"
      >
        {{ todo.text }}
      </li>
    </ul>

    <div class="note-card__footer">
      <BaseButton :to="`/notes/${props.note.id}`" compact icon-name="edit">
        Редактировать
      </BaseButton>

      <BaseButton compact icon-name="delete" @click="showDeleteModal = true">
        Удалить
      </BaseButton>
    </div>
  </article>

  <BaseModal
    v-if="showDeleteModal"
    title="Удалить заметку?"
    message="Вы уверены, что хотите удалить заметку? Это действие нельзя будет отменить."
    confirm-text="Удалить"
    @confirm="confirmDelete"
    @close="showDeleteModal = false"
  />
</template>

<style scoped lang="scss">
.note-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  border-radius: $rounded-2xl;
  border: 1px solid $stroke;
  background-color: $white;
  box-shadow: 0 1px 3px $black-a04;
  padding: 20px;

  @include transition();

  &:hover {
    border-color: $lilac;
    box-shadow:
      0 8px 24px -4px rgba(124, 58, 237, 0.12),
      0 2px 8px rgba(124, 58, 237, 0.06);
  }
}

.note-card__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: $dark-stone;
}

.note-card__caption {
  @include Text-Caption-16();
}

.note-card__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.note-card__badge {
  padding: 2px 8px;
  border-radius: $rounded-sm;
  border: 1px solid $green-border;
  background-color: $green-bg;
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  color: $green;
}

.note-card__list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: $text-main;

  &:before {
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid $gray-dark;
  }
}

.note-card__list-item--checked {
  position: relative;
  color: $gray;
  text-decoration: line-through;

  &:before {
    border: 1px solid $violet;
    background-color: $violet;
  }

  &:after {
    content: '';
    position: absolute;
    top: 4px;
    left: 6px;
    width: 4px;
    height: 10px;
    border: solid $white;
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
  }
}

.note-card__footer {
  gap: 8px;
  margin-top: auto;
  opacity: 0;

  @include flex-center();
  @include transition();

  .note-card:hover & {
    opacity: 1;
  }
}
</style>
