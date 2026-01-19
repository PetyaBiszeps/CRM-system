<script setup lang="ts" generic="T">
import {
  type Table,
  FlexRender
} from '@tanstack/vue-table'

const { state, table, isFetching } = defineProps<{
  state: {
    ui: {
      filters: boolean
      isCreating: boolean
    }
  }
  table: Table<T>
  isFetching: boolean
}>()
</script>

<template>
  <tbody
    :class="[{
      isFetching: isFetching,
    }]"
  >
    <TableRow v-if="state.ui.isCreating" />

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