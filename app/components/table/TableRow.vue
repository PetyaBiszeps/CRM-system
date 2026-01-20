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
        <BaseButton
          variant="action"
          @click="emit('save', row as T)"
        >
          <template #left-icon>
            <Icon
              :size="16"
              name="material-symbols:save-outline"
            />
          </template>
        </BaseButton>

        <BaseButton
          variant="action"
          @click="emit('cancel')"
        >
          <template #left-icon>
            <Icon
              :size="16"
              name="material-symbols:close-small-outline"
            />
          </template>
        </BaseButton>
      </template>

      <template v-else>
        <!-- <TableCell /> -->
      </template>
    </td>
  </tr>
</template>