<script setup lang="ts">
import type {
  ColumnDef
} from '@tanstack/vue-table'

const { columns } = defineProps<{
  columns: ColumnDef<T>[]
}>()
const emit = defineEmits(['save', 'cancel'])
</script>

<template>
  <tr>
    <td
      v-for="column in columns"
      :key="column.id"
    >
      <template v-if="column.id === 'actions'">
        <BaseButton @click="emit('save')">
          Save
        </BaseButton>

        <BaseButton @click="emit('cancel')">
          Cancel
        </BaseButton>
      </template>

      <template v-else>
        {{ column }}
      </template>
    </td>
  </tr>
</template>