<script setup lang="ts" generic="T">
import type {
  ColumnDef
} from '@tanstack/vue-table'

const { columns } = defineProps<{
  columns: ColumnDef<T>[]
}>()
const emit = defineEmits(['save', 'cancel'])

const row = ref<Partial<T>>({})
</script>

<template>
  <tr>
    <td
      v-for="column in columns"
      :key="column.id"
    >
      <template v-if="column.id === 'actions'">
        <BaseButton @click="emit('save', row)">
          Save
        </BaseButton>

        <BaseButton @click="emit('cancel')">
          Cancel
        </BaseButton>
      </template>

      <template v-else>
        <!-- <TableCell /> -->
      </template>
    </td>
  </tr>
</template>