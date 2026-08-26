<script setup lang="ts">
import { toRaw } from 'vue'
import type { Todo } from '~/types/note'
import type { HistoryAction } from '~/types/historyAction.ts'
const route = useRoute()
const notesStore = useNotesStore()

const { draft, applyAction, saveHistoryAction } = useNoteEditor()

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

let previousTitle = ''

function startTitleEdit() {
  previousTitle = draft.value.title
}

function finishTitleEdit() {
  if (previousTitle === draft.value.title) {
    return
  }

  const action: HistoryAction = {
    type: 'update-title',
    previous: previousTitle,
    next: draft.value.title,
  }

  saveHistoryAction(action)
}

const addTodo = () => {
  const todo: Todo = {
    id: crypto.randomUUID(),
    text: '',
    completed: false,
  }

  const action: HistoryAction = {
    type: 'add-todo',
    todo,
    index: draft.value.todos.length,
  }

  applyAction(action)
  saveHistoryAction(action)
}

const deleteTodo = (id: string) => {
  const index = draft.value.todos.findIndex((todo) => todo.id === id)
  const todo = draft.value.todos[index]

  if (index === -1 || !todo) {
    return
  }

  const action: HistoryAction = {
    type: 'delete-todo',
    todo: structuredClone(toRaw(todo)),
    index,
  }

  applyAction(action)
  saveHistoryAction(action)
}

function findTodo(id: string) {
  return draft.value.todos.find((todo) => todo.id === id)
}

const previousTodoTexts = new Map<string, string>()

function startTodoTextEdit(id: string) {
  const todo = findTodo(id)

  if (!todo) {
    return
  }

  previousTodoTexts.set(id, todo.text)
}

function finishTodoTextEdit(id: string) {
  const todo = findTodo(id)

  if (!todo) {
    return
  }

  const previous = previousTodoTexts.get(id)

  if (previous === undefined || previous === todo.text) {
    return
  }

  const action: HistoryAction = {
    type: 'update-todo-text',
    todoId: id,
    previous,
    next: todo.text,
  }

  saveHistoryAction(action)

  previousTodoTexts.delete(id)
}

function updateTodoText(id: string, text: string) {
  const todo = findTodo(id)

  if (!todo) {
    return
  }

  todo.text = text
}

function toggleTodo(id: string, completed: boolean) {
  const todo = findTodo(id)

  if (!todo) {
    return
  }

  const action: HistoryAction = {
    type: 'toggle-todo',
    todoId: id,
    previous: todo.completed,
    next: completed,
  }

  applyAction(action)
  saveHistoryAction(action)
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
          @focus="startTitleEdit"
          @blur="finishTitleEdit"
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
        @start-text-edit="startTodoTextEdit"
        @finish-text-edit="finishTodoTextEdit"
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
