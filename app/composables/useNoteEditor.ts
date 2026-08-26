import { toRaw } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { Note } from '~/types/note'

const draft = ref<Note>({
  id: crypto.randomUUID(),
  title: '',
  todos: [],
})

const history = ref<Note[]>([])
const historyIndex = ref(-1)

function saveHistory() {
  const snapshot = structuredClone(toRaw(draft.value))

  history.value = history.value.slice(0, historyIndex.value + 1)

  history.value.push(toRaw(snapshot))

  if (history.value.length > 50) {
    history.value.shift()
  }

  historyIndex.value = history.value.length - 1
}

const saveTextHistory = useDebounceFn(() => {
  saveHistory()
}, 500)

function undo() {
  if (historyIndex.value <= 0) {
    return
  }

  historyIndex.value--

  const snapshot = history.value[historyIndex.value]

  if (!snapshot) {
    return
  }

  draft.value = structuredClone(toRaw(snapshot))
}

function redo() {
  if (historyIndex.value >= history.value.length - 1) {
    return
  }

  historyIndex.value++

  const snapshot = history.value[historyIndex.value]

  if (!snapshot) {
    return
  }

  draft.value = structuredClone(toRaw(snapshot))
}

const canUndo = computed(() => historyIndex.value > 0)

const canRedo = computed(() => {
  return historyIndex.value < history.value.length - 1
})

export function useNoteEditor() {
  const notesStore = useNotesStore()
  const router = useRouter()

  function saveNote() {
    notesStore.updateNote(draft.value)
    router.push('/')
  }

  function cancelEdit() {
    router.push('/')
  }

  return {
    draft,
    undo,
    redo,
    canUndo,
    canRedo,
    saveTextHistory,
    saveHistory,
    saveNote,
    cancelEdit,
  }
}
