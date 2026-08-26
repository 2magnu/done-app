<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string,
    size?: number,
  }>(), {
    size: 24
  }
)
</script>

<template>
  <svg :width="props.size" :height="props.size" class="base-icon">
    <use :href="`/icons/sprite.svg#${name}`" />
  </svg>
</template>

<style scoped lang="scss">
.base-icon {
  display: block;
  flex-shrink: 0;
  color: inherit;
}
</style>