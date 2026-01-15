<script setup lang="ts" generic="T extends Record<string, any>">
import {
  FlexRender,
  useVueTable,
  getCoreRowModel,
  createColumnHelper
} from '@tanstack/vue-table'

const { items } = defineProps<{
  items: T[]
}>()

const columns = computed(() => {
  if (!items || items.length === 0) {
    return []
  }
  const helper = createColumnHelper<T>()

  return Object.keys(items[0] as Record<string, any>).map(key => helper
    .accessor(key as any, {
      header: key.toUpperCase(),
      cell: info => info.getValue()
    }))
})

const table = useVueTable({
  get data() {
    return items
  },
  get columns() {
    return columns.value
  },
  getCoreRowModel: getCoreRowModel()
})
</script>

<template>
  <div class="tableWrapper">
    <table v-if="items.length > 0">
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            <h4>
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </h4>
          </th>
        </tr>
      </thead>

      <tbody>
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

    <div v-else>
      No data available
    </div>
  </div>
</template>