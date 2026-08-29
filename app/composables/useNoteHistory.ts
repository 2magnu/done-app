import type { HistoryAction } from '~/types/historyAction'
import type { NoteDraft } from '~/types/note'
import { computed, ref, shallowRef } from 'vue'

export function useNoteHistory(draft: Ref<NoteDraft>) {
  const history = shallowRef<HistoryAction[]>([])
  const historyIndex = ref(-1)

  function applyAction(action: HistoryAction) {
    switch (action.type) {
      case 'add-todo':
        draft.value.todos.splice(action.index, 0, action.todo)
        break

      case 'delete-todo':
        draft.value.todos.splice(action.index, 1)
        break

      case 'update-todo-text': {
        const todo = draft.value.todos.find((todo) => todo.id === action.todoId)

        if (todo) {
          todo.text = action.next
        }

        break
      }

      case 'toggle-todo': {
        const todo = draft.value.todos.find((todo) => todo.id === action.todoId)

        if (todo) {
          todo.completed = action.next
        }

        break
      }

      case 'update-title':
        draft.value.title = action.next
        break
    }
  }

  function applyInverseAction(action: HistoryAction) {
    switch (action.type) {
      case 'add-todo':
        draft.value.todos.splice(action.index, 1)
        break

      case 'delete-todo':
        draft.value.todos.splice(action.index, 0, structuredClone(action.todo))
        break

      case 'update-todo-text': {
        const todo = draft.value.todos.find((todo) => todo.id === action.todoId)

        if (todo) {
          todo.text = action.previous
        }

        break
      }

      case 'toggle-todo': {
        const todo = draft.value.todos.find((todo) => todo.id === action.todoId)

        if (todo) {
          todo.completed = action.previous
        }

        break
      }

      case 'update-title':
        draft.value.title = action.previous
        break
    }
  }

  function saveHistoryAction(action: HistoryAction) {
    const newHistory = history.value.slice(0, historyIndex.value + 1)

    newHistory.push(structuredClone(action))

    if (newHistory.length > 50) {
      newHistory.shift()
    }

    history.value = newHistory
    historyIndex.value = newHistory.length - 1

    // Для просмотра истории изменений
    console.log('history:', history.value)
    console.log('last action:', history.value[history.value.length - 1])
  }

  function handleKeydown(event: KeyboardEvent) {
    const modifier = event.ctrlKey || event.metaKey

    const isUndo = modifier && !event.shiftKey && event.key.toLowerCase() === 'z'
    const isRedo = modifier && event.shiftKey && event.key.toLowerCase() === 'z'

    if (!isUndo && !isRedo) {
      return
    }

    const target = event.target as HTMLInputElement

    if (target.tagName === 'INPUT') {
      return
    }

    event.preventDefault()

    if (event.shiftKey) {
      redo()
    } else {
      undo()
    }
  }

  function undo() {
    if (historyIndex.value < 0) {
      return
    }

    const action = history.value[historyIndex.value]

    if (!action) {
      return
    }

    applyInverseAction(action)

    historyIndex.value--
  }

  function redo() {
    if (historyIndex.value >= history.value.length - 1) {
      return
    }

    historyIndex.value++

    const action = history.value[historyIndex.value]

    if (!action) {
      return
    }

    applyAction(action)
  }

  const canUndo = computed(() => historyIndex.value >= 0)

  const canRedo = computed(() => {
    return historyIndex.value < history.value.length - 1
  })

  function resetHistory() {
    history.value = []
    historyIndex.value = -1
  }

  return {
    applyAction,
    saveHistoryAction,
    handleKeydown,
    undo,
    redo,
    canUndo,
    canRedo,
    resetHistory,
  }
}