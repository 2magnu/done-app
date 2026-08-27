export interface Todo {
  id: string
  text: string
  completed: boolean
}

export interface Note {
  id: string
  title: string
  todos: Todo[]
  updatedAt: string
}

export type NoteDraft = Omit<Note, 'updatedAt'>