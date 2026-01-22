<script setup lang="ts">
definePageMeta({
  title: 'pages.kanban.title'
})

const {
  handleMove,
  getCardsByStatus
} = useKanban('/api/kanban')
</script>

<template>
  <div :class="['kanbanPage']">
    <KanbanColumn
      v-for="col in kanbanColumns"
      :key="col.status"

      :title="col.title"
      :status="col.status"
      :color="col.color"
      :cards="getCardsByStatus(col.status)"

      @move="handleMove"
    />
  </div>
</template>