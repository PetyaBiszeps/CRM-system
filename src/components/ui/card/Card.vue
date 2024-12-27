<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/shadcn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
      :class="
      cn(
        'rounded-xl border-2 bg-card text-card-foreground shadow',
        props.class,
      )
    "
  >
    <slot/>
  </div>
</template>
