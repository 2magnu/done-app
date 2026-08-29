import type { NoteDraft } from '~/types/note'
import { useNoteHistory } from '~/composables/useNoteHistory.ts'

const draft = ref<NoteDraft>(createEmptyDraft())

function createEmptyDraft(): NoteDraft {
  return {
    id: crypto.randomUUID(),
    title: '',
    todos: [],
  }
}

const history = useNoteHistory(draft) //

export function useNoteEditor() {
  const notesStore = useNotesStore()
  const router = useRouter()

  function resetEditor() {
    draft.value = createEmptyDraft()
    history.resetHistory()
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
    ...history,
    saveNote,
    deleteNote,
    cancelEdit,
  }
}
