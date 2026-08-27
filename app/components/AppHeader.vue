<script setup lang="ts">
import { pluralizeNotes } from '~/utils/pluralizeNotes.ts'

const notesStore = useNotesStore()
const { undo, redo, canUndo, canRedo, saveNote, deleteNote, cancelEdit } = useNoteEditor()

defineProps<{
  isNotePage: boolean
}>()

const showDeleteModal = ref(false)
const showCancelModal = ref(false)

function confirmCancel() {
  showCancelModal.value = false

  cancelEdit()
}

function confirmDelete() {
  showDeleteModal.value = false

  deleteNote()
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__container container">
      <template v-if="isNotePage">
        <div class="app-header__back">
          <BaseButton
            compact
            icon-name="caret-left"
            class="app-header__back-button"
            @click="showCancelModal = true"
          />
          <h1 class="app-header__back-title">Редактирование заметки</h1>
        </div>

        <div class="app-header__history">
          <BaseButton
            icon-name="undo"
            compact
            :disabled="!canUndo"
            class="app-header__button"
            @click="undo"
          />

          <BaseButton
            icon-name="redo"
            compact
            :disabled="!canRedo"
            class="app-header__button"
            @click="redo"
          />

          <BaseButton
            icon-name="delete"
            compact
            class="app-header__button"
            @click="showDeleteModal = true"
          />
        </div>

        <div class="app-header__actions">
          <BaseButton secondary class="app-header__btn" @click="showCancelModal = true"
            >Отмена</BaseButton
          >
          <BaseButton primary class="app-header__btn" @click="saveNote">Сохранить</BaseButton>
        </div>

        <Teleport to="#mobile-actions" class="app-header__history">
          <BaseButton secondary class="app-header__btn" @click="showCancelModal = true"
            >Отмена</BaseButton
          >
          <BaseButton primary class="app-header__btn" @click="saveNote">Сохранить</BaseButton>
        </Teleport>
      </template>

      <template v-else>
        <NuxtLink to="/" class="app-header__title"
          ><span class="app-header__emoji">👾</span>Доне</NuxtLink
        >

        <span class="app-header__count"
          >{{ notesStore.notes.length }} {{ pluralizeNotes(notesStore.notes.length) }}</span
        >
      </template>
    </div>
  </header>
  <BaseModal
    v-if="showCancelModal"
    title="Отменить редактирование?"
    message="Все несохраненные изменения будут потеряны."
    confirm-text="Отменить редактирование"
    @confirm="confirmCancel"
    @close="showCancelModal = false"
  />

  <BaseModal
    v-if="showDeleteModal"
    title="Удалить заметку?"
    message="Заметка будет удалена без возможности восстановления."
    confirm-text="Удалить"
    @confirm="confirmDelete"
    @close="showDeleteModal = false"
  />
</template>

<style scoped lang="scss">
.app-header {
  z-index: 90;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  border-bottom: 1px solid $stroke;
  background-color: $white;
}

.app-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
}

.app-header__title {
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: $text-main;
}

.app-header__count {
  @include Text-Caption-16();
}

.app-header__back {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-header__back-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: $text-main;
}

.app-header__history {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;

  @include tab {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      right: -12px;
      width: 1px;
      height: 24px;
      background: $stroke;
    }
  }
}

.app-header__actions {
  display: none;

  @include tab {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.app-header__emoji {
  display: inline-block;
  margin-right: 4px;

  @include transition($time: 0.6s);

  &:hover {
    animation: jump 0.6s ease-in-out infinite alternate;
  }
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
