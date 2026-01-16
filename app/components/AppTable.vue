<script setup lang="ts" generic="T extends Record<string, any>">
import {
  FlexRender,
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
  manualPagination: true,
  getCoreRowModel: getCoreRowModel()
})

const isFilterOpen = ref<boolean>(true)
</script>

<template>
  <div class="tableWrapper">
    <table>
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
            open: isFilterOpen,
          }]"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            <div class="filterWrapper">
              <input
                v-if="header.column.getCanFilter?.() ?? true"
                type="text"
                :value="filters[header.id] || ''"
                placeholder="Filter..."
                @click.stop
                @input="(e) => emit('filter', header.id, (e.target as HTMLInputElement).value)"
              >
            </div>
          </th>
        </tr>
      </thead>

      <tbody v-if="pending && (!items || items.length === 0)">
        <tr>
          <td>
            <AppLoader />
          </td>
        </tr>
      </tbody>

      <tbody v-else-if="error">
        <tr>
          <td>Error :(</td>
        </tr>
      </tbody>

      <tbody
        v-else
        :class="[{
          pending: pending,
        }]"
      >
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>