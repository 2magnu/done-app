<script setup lang="ts">
import type { Todo } from '~/types/note'

const props = defineProps<{ todo: Todo }>()

const emit = defineEmits<{
  'update-text': [id: string, text: string]
  delete: [id: string]
  toggle: [id: string, completed: boolean]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update-text', props.todo.id, target.value)
}

function deleteTodo() {
  emit('delete', props.todo.id)
}

function toggleTodo(event: Event) {
  const target = event.target as HTMLInputElement

  emit('toggle', props.todo.id, target.checked)
}
</script>

<template>
  <li class="todo-item">
    <label class="fake-checkbox" :class="{ 'fake-checkbox--checked': todo.completed }">
      <input
        type="checkbox"
        hidden
        :checked="todo.completed"
        class="fake-checkbox__input"
        @change="toggleTodo"
      />
      <span class="fake-checkbox__box" />
    </label>

    <input
      type="text"
      placeholder="Введите текст задачи..."
      :value="todo.text"
      class="todo-item__input"
      @input="onInput"
    />

    <BaseButton compact icon-name="delete" class="todo-item__delete" @click="deleteTodo" />
  </li>
</template>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f8f6ff;
  border-radius: $rounded-xl;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: $text-main;
}

.todo-item__input {
  width: 100%;
  padding: 4px 8px;
  outline: none;
  border: none;
  border-radius: $rounded-sm;
  background: transparent;

  &:focus {
    border: 1px solid $lilac;
    background-color: $white;
  }
}

.todo-item__delete {
  margin-left: auto;
}

.fake-checkbox {
  flex-shrink: 0;
  cursor: pointer;
  flex-shrink: 0;

  @include flex-center();
}

.fake-checkbox__input {
}

.fake-checkbox__box {
  width: 20px;
  height: 20px;
  border: 1px solid $gray-dark;
  border-radius: $rounded-sm;
  background-color: $white;

  .fake-checkbox--checked & {
    position: relative;
    border-color: $violet;
    background-color: $violet;

    &:before {
      content: '';
      position: absolute;
      top: 2px;
      left: 6px;
      width: 6px;
      height: 12px;
      border: solid $white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}
</style>
