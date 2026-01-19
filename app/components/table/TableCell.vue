<script setup lang="ts" generic="T">
import type {
  ColumnDef
} from '@tanstack/vue-table'

const { column } = defineProps<{
  column: ColumnDef<T>
}>()
// const emit = defineEmits([])

const model = defineModel<string | number>({
  required: true
})

const defaults = computed(() => {
  return {
    id: column.id as string,
    name: column.id as string,
    type: 'text', // Add column.meta.type in future
    placeholder: column.id as string
  }
})
</script>

<template>
  <BaseInput
    v-model="model"

    :id="defaults.id"
    :name="defaults.name"
    :type="defaults.type"
    :placeholder="defaults.placeholder"
  />
</template>