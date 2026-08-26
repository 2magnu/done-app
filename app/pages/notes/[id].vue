<script setup lang="ts">
import { toRaw } from 'vue'
import type { Todo } from '~/types/note'
const route = useRoute()
const notesStore = useNotesStore()

const { draft, saveHistory, saveTextHistory } = useNoteEditor()

if (route.params.id !== 'new') {
  const note = computed(() => {
    return notesStore.getNoteByID(String(route.params.id))
  })

  if (!note.value) {
    throw createError({
      status: 404,
      statusText: 'Заметка не найдена',
    })
  }

  draft.value = structuredClone(toRaw(note.value))
}

saveHistory()

const addTodo = () => {
  const todo: Todo = {
    id: crypto.randomUUID(),
    text: '',
    completed: false,
  }

  draft.value.todos.push(todo)
  saveHistory()
}

const deleteTodo = (id: string) => {
  draft.value.todos = draft.value.todos.filter((todo) => todo.id !== id)

  saveHistory()
}

function findTodo(id: string) {
  return draft.value.todos.find((todo) => todo.id === id)
}

function updateTodoText(id: string, text: string) {
  const todo = findTodo(id)

  if (!todo) {
    return
  }

  todo.text = text
  saveTextHistory()
}

function toggleTodo(id: string, completed: boolean) {
  const todo = findTodo(id)

  if (todo) {
    todo.completed = completed
  }
}

const completedTodos = computed(() => {
  return draft.value.todos.filter((todo) => todo.completed).length
})

const progress = computed(() => {
  const total = draft.value.todos.length

  return total ? Math.round((completedTodos.value / total) * 100) : 0
})
</script>

<template>
  <div class="edit-note">
    <section class="edit-note__section">
      <label class="edit-note__title">
        <input
          v-model="draft.title"
          type="text"
          placeholder="Заголовок"
          class="edit-note__title-input"
          @input="saveTextHistory"
        />
      </label>

      <div class="edit-note__progress">
        <div class="edit-note__progress-header">
          <h2 class="edit-note__progress-title">Задачи</h2>

          <span v-if="draft.todos.length > 0" class="edit-note__progress-counter">{{
            `${completedTodos} из ${draft.todos.length} готово`
          }}</span>
        </div>

        <div
          v-if="draft.todos.length > 0"
          class="edit-note__progress-bar"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <TodoList
        :todos="draft.todos"
        @update-text="updateTodoText"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />

      <BaseButton compact icon-name="add" @click="addTodo">Добавить задачу</BaseButton>
    </section>
  </div>
</template>

<style scoped lang="scss">
.edit-note__section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.edit-note__title-input {
  width: min(100%, 680px);
  height: 48px;
  outline: none;
  border: none;
  border-bottom: 2px solid $violet;
  background-color: transparent;
  font-size: 28px;
  font-weight: 700;
  color: #0d0d12;
}

.edit-note__progress {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-note__progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-note__progress-title {
  @include Text-Label();
}

.edit-note__progress-counter {
  @include Text-Caption-16();
}

.edit-note__progress-bar {
  height: 3px;
  background-color: $violet;

  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: $btn-hover-bg;
  }
}
</style>
