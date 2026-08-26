import { toRaw } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { Note } from '~/types/note'

const draft = ref<Note>(createEmptyDraft())
const history = ref<Note[]>([])
const historyIndex = ref(-1)

function createEmptyDraft(): Note {
  return {
    id: crypto.randomUUID(),
    title: '',
    todos: [],
  }
}

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

  draft.value = structuredClone(snapshot)
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

  function resetEditor() {
    draft.value = createEmptyDraft()
    history.value = []
    historyIndex.value = -1
  }

  function saveNote() {
    notesStore.updateNote(draft.value)

    resetEditor()
    router.push('/')
  }

  function deleteNote() {
    notesStore.deleteNote(draft.value.id)

    resetEditor()
    router.push('/')
  }

  function cancelEdit() {
    resetEditor()
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
    deleteNote,
    cancelEdit,
  }
}
