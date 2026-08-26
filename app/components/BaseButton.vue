<script setup lang="ts">
const props = defineProps<{
  to?: string
  iconName?: string
  disabled?: boolean
  primary?: boolean
  secondary?: boolean
  compact?: boolean
}>()

const btnClasses = computed(() => {
  return {
    'base-button--secondary': props.secondary,
    'base-button--primary': props.primary,
    'base-button--compact': props.compact,
    'base-button--icon': props.iconName,
  }
})

const buttonOptions = computed(() => {
  if (buttonComponent.value === 'button') {
    return {
      type: 'button',
      disabled: props.disabled,
    }
  } else {
    return {
      to: props.to,
    }
  }
})

const buttonComponent = computed(() => {
  return props.to ? resolveComponent('NuxtLink') : 'button'
})
</script>

<template>
  <Component :is="buttonComponent" v-bind="buttonOptions" class="base-button" :class="btnClasses">
    <BaseIcon v-if="iconName" :name="iconName" class="base-button__icon" />

    <slot />
  </Component>
</template>

<style scoped lang="scss">
.base-button {
  gap: 8px;
  width: fit-content;
  height: 40px;
  border-radius: $rounded-xl;
  border: 1px solid $btn-border;
  background: transparent;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: $btn-color;

  @include flex-center();
  @include transition();

  &:hover {
    background: $btn-hover-bg;
    border: 1px solid $btn-hover-border;
    color: $btn-hover-color;
  }

  &:active,
  &:focus {
    background: $btn-active-bg;
    border: 2px solid $btn-active-border;
    color: $btn-active-color;
  }
}

.base-button--primary {
  color: $btn-primary-color;
  border: none;
  background: $btn-primary-bg;
  box-shadow: $btn-primary-shadow;

  &:hover {
    color: $btn-primary-hover-color;
    border: none;
    background: $btn-primary-hover-bg;
    box-shadow: $btn-primary-hover-shadow;
  }

  &:disabled {
    opacity: 0.4;
  }
}

.base-button--compact {
  gap: 6px;
  height: 32px;
  padding: 6px 8px;
  border-radius: $rounded-lg;
  font-size: 12px;
  line-height: 16px;
}

.base-button__icon {
  flex-shrink: 0;
  display: block;
  width: 16px;
  height: 16px;
  color: $gray-icon;

  &.base-button--compact {
    width: 14px;
    height: 14px;
  }
}
</style>
