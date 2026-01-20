<script setup lang="ts" generic="T">
import { FlexRender } from '@tanstack/vue-table'
import type {
  Table,
  ColumnDef
} from '@tanstack/vue-table'

const { ui, table, columns, isFetching } = defineProps<{
  ui: {
    isFilters: boolean
    isCreating: boolean
  }
  table: Table<T>
  columns: ColumnDef<T>[]
  isFetching: boolean
}>()
</script>

<template>
  <tbody
    :class="[{
      isFetching: isFetching,
    }]"
  >
    <TableRow
      v-if="ui.isCreating"

      :columns="columns"
    />

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
</template>