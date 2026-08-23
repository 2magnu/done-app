import { defineStore } from 'pinia'
import type { Note } from '~/types/note'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
  }),

  getters: {
    hasNotes: (state) => state.notes.length > 0,

    getNoteByID: (state) => {
      return (id: string) => {
        return state.notes.find((note) => note.id === id)
      }
    },
  },

  actions: {
    updateNote(note: Note) {
      const index = this.notes.findIndex((item) => item.id === note.id)

      if (index === -1) {
        this.notes.push(note)

        return
      }

      this.notes[index] = note
    },

    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id)
    },
  },
})
