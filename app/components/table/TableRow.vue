<script setup lang="ts" generic="T">
import type {
  ColumnDef
} from '@tanstack/vue-table'

const { columns } = defineProps<{
  columns: ColumnDef<T>[]
}>()
const emit = defineEmits(['save', 'cancel'])

const row = reactive<Partial<T>>({})
</script>

<template>
  <tr>
    <td
      v-for="column in columns"
      :key="column.id"
      :class="column.id"
    >
      <template v-if="column.id === 'actions'">
        <BaseButton @click="emit('save', row as T)">
          <template #left-icon>
            <Icon
              :size="25"
              name="material-symbols:save-outline"
            />
          </template>
        </BaseButton>

        <BaseButton @click="emit('cancel', row as T)">
          <template #left-icon>
            <Icon
              :size="25"
              name="material-symbols:cancel-outline"
            />
          </template>
        </BaseButton>
      </template>

      <template v-else>
        <TableCell
          v-model="(row as any)[column.id!]"

          :column="column"
        />
      </template>
    </td>
  </tr>
</template>