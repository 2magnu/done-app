import { defineStore } from 'pinia'
import type { Note, NoteDraft } from '~/types/note'

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
    loadNotes() {
      const localNotes = localStorage.getItem('notes')

      this.notes = localNotes ? JSON.parse(localNotes).notes : []
    },

    saveToStorage() {
      const data = {
        version: 1,
        notes: this.notes,
      }

      localStorage.setItem('notes', JSON.stringify(data))
    },

    updateNote(note: NoteDraft) {
      const index = this.notes.findIndex((item) => item.id === note.id)

      if (index === -1) {
        this.notes.push({
          ...note,
          updatedAt: new Date().toISOString(),
        })
      } else {
        this.notes[index] = {
          ...note,
          updatedAt: new Date().toISOString(),
        }
      }

      this.saveToStorage()
    },

    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id)

      this.saveToStorage()
    },
  },
})
