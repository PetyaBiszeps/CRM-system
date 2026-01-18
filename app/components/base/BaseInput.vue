<script setup lang="ts">
const {
  id,
  name,
  type,
  placeholder,
  disabled = false,
  readonly = false,
  autocomplete = 'off',
  variant = 'ghost'
} = defineProps<{
  id: string
  name: string
  type: string
  placeholder: string
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  variant?: 'ghost' | 'primary' | 'secondary' | 'tertiary'
}>()
const emit = defineEmits(['focus', 'blur'])

const model = defineModel<string | number>({
  required: true
})
</script>

<template>
  <input
    v-model="model"

    :id="id"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :autocomplete="autocomplete"

    :class="['base-input', `base-input--${variant}`]"

    @focus="emit('focus')"
    @blur="emit('blur')"
  >
</template>