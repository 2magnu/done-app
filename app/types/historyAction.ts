import type { Todo } from '~/types/note'

export type HistoryAction =
  | {
      type: 'update-title'
      previous: string
      next: string
    }
  | {
      type: 'update-todo-text'
      todoId: string
      previous: string
      next: string
    }
  | {
      type: 'add-todo'
      todo: Todo
      index: number
    }
  | {
      type: 'delete-todo'
      todo: Todo
      index: number
    }
  | {
      type: 'toggle-todo'
      todoId: string
      previous: boolean
      next: boolean
    }
