<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/shadcn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('p-3 pt-0 sm:p-6 sm:pt-0', props.class)">
    <slot/>
  </div>
</template>
