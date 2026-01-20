<script setup lang="ts" generic="T">
const { header, filters } = defineProps<{
  header: {
    id: string
  }
  filters: {
    id: string
    value: string
  }[]
}>()
const emit = defineEmits(['filter'])

const getFilter = (columnId: string): string => {
  return filters.find(filter => filter.id === columnId)?.value || ''
}
</script>

<template>
  <div class="filterWrapper">
    <BaseInput
      :id="`filter-${header.id}`"
      :model-value="getFilter(header.id)"
      :name="`filter-${header.id}`"
      :type="'text'"
      :placeholder="'filter...'"
      :variant="'table'"

      @click.stop
      @input="(e: Event) => emit('filter', header.id, (e.target as HTMLInputElement).value)"
    />
  </div>
</template>