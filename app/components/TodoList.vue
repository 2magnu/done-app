<script setup lang="ts">
import type { Todo } from '~/types/note'
//todo: добавить drag n drop

const props = defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  'update-text': [id: string, text: string]
  'start-text-edit': [id: string]
  'finish-text-edit': [id: string]
  delete: [id: string]
  toggle: [id: string, completed: boolean]
}>()
</script>

<template>
  <ul v-if="todos.length > 0" class="todo-list">
    <TodoItem
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      @update-text="(id, text) => emit('update-text', id, text)"
      @toggle="(id, completed) => emit('toggle', id, completed)"
      @delete="(id) => emit('delete', id)"
      @start-text-edit="id => emit('start-text-edit', id)"
      @finish-text-edit="id => emit('finish-text-edit', id)"
    />
  </ul>
</template>

<style scoped lang="scss">
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
