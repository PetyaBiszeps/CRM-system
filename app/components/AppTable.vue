<script setup lang="ts" generic="T extends Record<string, any>">
import {
  useVueTable,
  type ColumnDef,
  getCoreRowModel
} from '@tanstack/vue-table'

const { error, items, pending, columns, filters = {} } = defineProps<{
  error: unknown
  items: T[] | undefined
  pending: boolean
  columns: ColumnDef<T>[]

  filters?: Record<string, string>
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}>()
const emit = defineEmits(['sort', 'filter'])

const table = useVueTable({
  get data() {
    return items || []
  },
  get columns() {
    return columns
  },
  manualSorting: true,
  manualFiltering: true,
  manualPagination: true,
  getCoreRowModel: getCoreRowModel()
})

function toggleSort(id: string) {
  emit('sort', id)
}

function toggleFilter(id: string, value: string) {
  emit('filter', id, value)
}
</script>

<template>
  <div class="tableWrapper">
    <table>
      <TableHeader
        :table="table"

        :filters="filters"
        :sort-by="sortBy"
        :sort-order="sortOrder"

        @sort="toggleSort"
        @filter="toggleFilter"
      />
      <TableError v-if="error" />

      <TableLoader
        v-else-if="pending
          && (!items || items.length === 0)"
      />

      <TableBody
        v-else

        :table="table"
        :pending="pending"
      />
    </table>
  </div>
</template>