<script setup lang="ts" generic="T">
import { FlexRender } from '@tanstack/vue-table'
import type {
  Table
} from '@tanstack/vue-table'

const { ui, table, filters } = defineProps<{
  ui: {
    isFilters: boolean
    isCreating: boolean
  }
  table: Table<T>
  filters: {
    id: string
    value: string
  }[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}>()
const emit = defineEmits(['sort', 'filter'])

const handleFilter = (id: string, value: string) => {
  emit('filter', id, value)
}
</script>

<template>
  <thead>
    <tr
      v-for="headerGroup in table.getHeaderGroups()"
      :key="headerGroup.id"
    >
      <th
        v-for="header in headerGroup.headers"
        :key="header.id"

        @click="emit('sort', header.id)"
      >
        <h4 v-if="!header.isPlaceholder">
          <FlexRender
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />

          <span v-if="sortBy === header.id">
            {{ sortOrder === 'asc' ? ' ↑' : ' ↓' }}
          </span>
        </h4>
      </th>
    </tr>

    <tr
      v-for="headerGroup in table.getHeaderGroups()"
      :key="headerGroup.id"
      :class="['filters', {
        open: ui.isFilters,
      }]"
    >
      <th
        v-for="header in headerGroup.headers"
        :key="header.id"
      >
        <TableFilter
          v-if="header.column.getCanFilter?.() ?? true"

          :header="header"
          :filters="filters"

          @filter="handleFilter"
        />
      </th>
    </tr>
  </thead>
</template>