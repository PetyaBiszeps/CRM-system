<script setup lang="ts">
const {
  id,
  name,
  options,
  placeholder,
  disabled = false
} = defineProps<{
  id: string
  name: string
  options: {
    id: string | number
    value: string | number
  }[]
  placeholder?: string
  disabled?: boolean
}>()
const emit = defineEmits(['focus', 'blur'])

const model = defineModel<string | number>({
  required: true
})
</script>

<template>
  <select
    v-model="model"

    :id="id"
    :name="name"
    :disabled="disabled"

    @focus="emit('focus')"
    @blur="emit('blur')"
  >
    <option
      v-if="placeholder"
      disabled
      selected
    />

    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.id }}
    </option>
  </select>
</template>