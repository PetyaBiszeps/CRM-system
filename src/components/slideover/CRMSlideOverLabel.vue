<script lang="ts" setup>
import { Label } from "radix-vue";

const props = defineProps({
  labelText: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div>
    <label v-if="labelText" class="block text-xs mt-8 opacity-75">{{ labelText }}</label>
  </div>

  <div class="text-base">
    <slot/>
  </div>
</template>

<style scoped>

</style>