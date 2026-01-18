<script setup lang="ts">
const {
  tag = 'button',
  name,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'ghost'
} = defineProps<{
  tag?: string
  name?: string
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
  loading?: boolean
  variant?: 'ghost' | 'primary' | 'secondary' | 'tertiary'
}>()
const emit = defineEmits(['click'])

const dynamicProps = computed(() => {
  return {
    type: tag === 'button' ? type : undefined,
    disabled: disabled || loading
  }
})

const handleClick = (event: MouseEvent) => {
  if (loading || disabled) {
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    v-bind="$attrs"

    :is="tag"
    :name="name"
    :type="dynamicProps.type"
    :disabled="dynamicProps.disabled"

    :class="['base-button', `base-button--${variant}`, {
      loading: loading,
    }]"

    @click="handleClick"
  >
    <slot name="left-icon" />

    <span v-if="!loading">
      <slot />
    </span>

    <span v-else>
      <slot name="loader">Loading...</slot>
    </span>

    <slot name="right-icon" />
  </component>
</template>