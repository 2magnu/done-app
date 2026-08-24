<script setup lang="ts">
defineEmits<{
  close: []
}>()

onMounted(() => {
  document.body.classList.add('no-scroll')
})

onUnmounted(() => {
  document.body.classList.remove('no-scroll')
})
</script>

<template>
  <Teleport to="body">
    <div class="base-modal">
      <div class="base-modal__overlay" @click="$emit('close')" />

      <div class="base-modal__content">
        <!--button type="button" class="base-modal__close" @click="$emit('close')">Закрыть</button-->
        <slot />
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
  box-shadow: 0 24px 64px -8px $black-a18, 0 8px 24px -4px $black-a08;
}
</style>