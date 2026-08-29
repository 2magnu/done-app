import { beforeEach, describe, it, expect } from 'vitest'
import { ref } from 'vue'
import type { Ref } from 'vue'

import { useNoteHistory } from './useNoteHistory'
import type { NoteDraft } from '~/types/note'
import type { HistoryAction } from '~/types/historyAction'

describe('Тестирует useNoteHistory', () => {
  let draft: Ref<NoteDraft>
  let history: ReturnType<typeof useNoteHistory>

  beforeEach(() => {
    draft = ref<NoteDraft>({
      id: '1',
      title: '',
      todos: [],
    })

    history = useNoteHistory(draft)
  })

  it('Добавляет задачу', () => {
    const action: HistoryAction = {
      type: 'add-todo',
      todo: {
        id: 'todo-1',
        text: 'Первая задача',
        completed: false,
      },
      index: 0,
    }

    history.applyAction(action)

    expect(draft.value.todos).toHaveLength(1)
    expect(draft.value.todos[0]).toEqual(action.todo)
  })

  it('Удаляет задачу', () => {
    const todo = {
      id: 'todo-1',
      text: 'Первая задача',
      completed: false,
    }

    draft.value.todos.push(todo)

    const action: HistoryAction = {
      type: 'delete-todo',
      todo,
      index: 0,
    }

    history.applyAction(action)

    expect(draft.value.todos).toHaveLength(0)
  })

  it('Изменяет текст задачи', () => {
    const todo = {
      id: 'todo-1',
      text: '',
      completed: false,
    }

    draft.value.todos.push(todo)

    const action: HistoryAction = {
      type: 'update-todo-text',
      todoId: todo.id,
      previous: '',
      next: 'Первая задача',
    }

    history.applyAction(action)

    expect(draft.value.todos[0]).toEqual({
      ...todo,
      text: action.next,
    })
  })

  it('Переключает статус выполнения задачи', () => {
    const todo = {
      id: 'todo-1',
      text: '',
      completed: false,
    }

    draft.value.todos.push(todo)

    const action: HistoryAction = {
      type: 'toggle-todo',
      todoId: todo.id,
      previous: false,
      next: true,
    }

    history.applyAction(action)

    expect(draft.value.todos[0]).toEqual({
      ...todo,
      completed: action.next,
    })
  })

  it('Изменяет текст заметки', () => {
    const action: HistoryAction = {
      type: 'update-title',
      previous: '',
      next: 'Новая заметка',
    }

    history.applyAction(action)

    expect(draft.value.title).toEqual(action.next)
  })
})
