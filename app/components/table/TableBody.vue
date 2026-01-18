<script setup lang="ts" generic="T">
import {
  type Table,
  FlexRender
} from '@tanstack/vue-table'

const { table, isFetching } = defineProps<{
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