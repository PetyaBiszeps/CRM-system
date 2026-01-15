<script setup lang="ts" generic="T extends Record<string, any>">
import {
  FlexRender,
  useVueTable,
  type ColumnDef,
  getCoreRowModel
} from '@tanstack/vue-table'

const { items, columns } = defineProps<{
  items: T[]
  columns: ColumnDef<T>[]
}>()

const table = useVueTable({
  get data() {
    return items
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
          >
            <h4 v-if="!header.isPlaceholder">
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </h4>
          </th>
        </tr>
      </thead>

      <tbody v-if="items.length > 0">
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

      <tbody v-else>
        <!-- Create TableLoader.vue instead -->
        <tr>
          <td
            :colspan="columns.length"
            style="text-align: center; padding: 2rem;"
          >
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>