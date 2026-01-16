<script setup lang="ts" generic="T extends Record<string, any>">
import {
  FlexRender,
  useVueTable,
  type ColumnDef,
  getCoreRowModel
} from '@tanstack/vue-table'

const { error, items, pending, columns } = defineProps<{
  error: unknown
  items: T[] | undefined
  pending: boolean
  columns: ColumnDef<T>[]

  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}>()
const emit = defineEmits(['sort'])

const table = useVueTable({
  get data() {
    return items || []
  },
  get columns() {
    return columns
  },
  getCoreRowModel: getCoreRowModel()
})
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
      </thead>

      <tbody v-if="pending && (!items || items.length === 0)">
        <tr>
          <AppLoader />
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