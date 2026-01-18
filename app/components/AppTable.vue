<script setup lang="ts" generic="T extends Record<string, any>">
import {
  useVueTable,
  type ColumnDef,
  getCoreRowModel
} from '@tanstack/vue-table'

const { state, error, items, isFetching, columns, filters = [] } = defineProps<{
  state: {
    ui: {
      filters: boolean
    }
  }
  error: unknown
  items: T[] | undefined
  isFetching: boolean
  columns: ColumnDef<T>[]

  filters?: {
    id: string
    value: string
  }[]
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

function handleSort(id: string) {
  emit('sort', id)
}

function handleFilter(id: string, value: string) {
  emit('filter', id, value)
}
</script>

<template>
  <div class="tableWrapper">
    <table>
      <TableHeader
        :state="state"
        :table="table"

        :filters="filters"
        :sort-by="sortBy"
        :sort-order="sortOrder"

        @sort="handleSort"
        @filter="handleFilter"
      />
      <TableError v-if="error" />

      <TableLoader
        v-else-if="isFetching
          && (!items || items.length === 0)"
      />

      <TableBody
        v-else

        :table="table"
        :is-fetching="isFetching"
      />
    </table>
  </div>
</template>