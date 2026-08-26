<script setup lang="ts">
defineProps<{
  title: string
  message: string
  confirmText: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

onMounted(() => {
  document.body.classList.add('no-scroll')
})

onUnmounted(() => {
  document.body.classList.remove('no-scroll')
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div class="base-modal" role="dialog" aria-modal="true">
      <div class="base-modal__overlay" @click="$emit('close')" />

      <div class="base-modal__content">
        <h2 class="base-modal__title">{{ title }}</h2>

        <p class="base-modal__message">{{ message }}</p>

        <div class="base-modal__actions">
          <BaseButton secondary @click="$emit('close')">Отменить</BaseButton>

          <BaseButton primary @click="$emit('confirm')">{{ confirmText }}</BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.base-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.base-modal__overlay {
  width: 100%;
  height: 100%;
  background-color: $modal-overlay;
}

.base-modal__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(100%, 440px);
  overflow-y: auto;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid $stroke;
  background-color: $white;
  box-shadow:
    0 24px 64px -8px $black-a18,
    0 8px 24px -4px $black-a08;
}

.base-modal__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: $text-main;
}

.base-modal__message {
  @include Text-Caption-20();

  color: $gray-icon;
  margin-bottom: 24px;
}

.base-modal__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
