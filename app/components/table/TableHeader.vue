<script setup lang="ts" generic="T">
import {
  type Table,
  FlexRender
} from '@tanstack/vue-table'

const { table, filters } = defineProps<{
  table: Table<T>
  filters: {
    id: string
    value: string
  }[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}>()
const emit = defineEmits(['sort', 'filter'])

const getFilter = (columnId: string): string => {
  return filters.find(filter => filter.id === columnId)?.value || ''
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
        open: true,
      }]"
    >
      <th
        v-for="header in headerGroup.headers"
        :key="header.id"
      >
        <div class="filterWrapper">
          <BaseInput
            v-if="header.column.getCanFilter?.() ?? true"
            :id="`filter-${header.id}`"
            :model-value="getFilter(header.id)"
            :name="`filter-${header.id}`"
            :type="'text'"
            :placeholder="'filter...'"
            :variant="'filter'"

            @click.stop
            @input="(e: Event) => emit('filter', header.id, (e.target as HTMLInputElement).value)"
          />
        </div>
      </th>
    </tr>
  </thead>
</template>