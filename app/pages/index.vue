<script setup lang="ts">
const notesStore = useNotesStore()

const searchValue = ref('')

const filteredNotes = computed(() => {
  const query = searchValue.value.trim().toLowerCase()

  if (!query) {
    return notesStore.notes
  }

  return notesStore.notes.filter((note) => note.title.toLowerCase().includes(query))
})
</script>

<template>
  <div class="notes-app">
    <template v-if="notesStore.hasNotes">
      <div class="toolbar">
        <div class="search">
          <BaseIcon name="search" class="search__icon" />

          <input
            v-model="searchValue"
            type="text"
            name="search"
            placeholder="Найти заметку"
            class="search__input"
          />
        </div>

        <BaseButton primary to="/notes/new">Создать заметку</BaseButton>
      </div>

      <ul class="notes-list">
        <li v-for="note in filteredNotes" :key="note.id">
          <NoteCard :note="note" />
        </li>
      </ul>
    </template>

    <template v-else>
      <div class="notes-empty">
        <div class="notes-empty__icon-wr">
          <BaseIcon name="note" class="notes-empty__icon" />
        </div>

        <span class="notes-empty__title">Магия чистого листа ✨</span>
        <span class="notes-empty__text">С чего начнем? Добавьте первую заметку.</span>
        <BaseButton primary to="/notes/new">Создать заметку</BaseButton>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.notes-app {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.notes-empty {
  flex-direction: column;

  @include flex-center();
}

.notes-empty__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  color: $text-main;
  margin-bottom: 4px;
}

.notes-empty__text {
  @include Text-Caption-20();

  color: $text-caption;
  margin-bottom: 24px;
}

.notes-empty__icon-wr {
  width: 72px;
  height: 72px;
  border-radius: $rounded-3xl;
  background: $empty-gradient;
  margin-bottom: 24px;

  @include flex-center();
}

.notes-empty__icon {
  width: 28px;
  height: 28px;
  color: $violet;
}

.toolbar {
  display: flex;
  gap: 12px;
}

.search {
  flex: 1;
  position: relative;
}

.search__icon {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: $gray;
  padding: 2px;

  @include flex-center();
}

.search__input {
  @include Text-Caption-20();

  outline: none;
  border-radius: $rounded-xl;
  border: 1px solid $stroke;
  background-color: $white;
  width: 100%;
  padding: 10px 12px 10px 34px;
  color: $text-main;

  &::placeholder {
    color: $text-placeholder;
  }
}

.notes-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
</style>
