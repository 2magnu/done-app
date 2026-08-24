<script setup lang="ts">
import { toRaw } from 'vue'
import type { Todo, Note } from '~/types/note'
const notesStore = useNotesStore()
const route = useRoute()
const router = useRouter()

const draft = ref<Note>({
  id: crypto.randomUUID(),
  title: '',
  todos: [],
})

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

// const history = ref([]) todo: добавить логику

const addTodo = () => {
  const todo: Todo = {
    id: crypto.randomUUID(),
    text: '',
    completed: false,
  }

  draft.value.todos.push(todo)
}

function findTodo(id: string) {
  return draft.value.todos.find((todo) => todo.id === id)
}

function updateTodoText(id: string, text: string) {
  const todo = findTodo(id)

  if (todo) {
    todo.text = text
  }
}

function toggleTodo(id: string, completed: boolean) {
  const todo = findTodo(id)

  if (todo) {
    todo.completed = completed
  }
}

function saveNote() {
  notesStore.updateNote(draft.value)

  router.push('/')
}
</script>

<template>
  <div class="note">
    <section>
      <label
        >Заголовок
        <input v-model="draft.title" type="text" placeholder="Заголовок">
      </label>

      <h3>Список задач</h3>

      <TodoList :todos="draft.todos" @update-text="updateTodoText" @toggle="toggleTodo" />

      <button type="button" @click="addTodo">Добавить задачу</button>

      <button type="button" @click="saveNote">Сохранить заметку</button>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
