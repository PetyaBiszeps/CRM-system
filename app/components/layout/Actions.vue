<script setup lang="ts">
interface sidebarButton {
  title: string
  icon: string
}

const theme = useTheme()

const sidebarButtons = computed<sidebarButton[]>(() => [{
  title: 'notifications',
  icon: 'material-symbols:notifications-outline',
}, {
  title: 'toggle theme',
  icon: theme.currentIcon.value,
}, {
  title: 'logout',
  icon: 'material-symbols:exit-to-app',
}])
</script>

<template>
  <div :class="['actions']">
    <ul>
      <li
        v-for="button in sidebarButtons"
        :key="button.title"
      >
        <button @click="theme.toggleTheme">
          <Icon
            :name="button.icon"
            :title="button.title"

            size="20"
          />
        </button>
      </li>
    </ul>
  </div>
</template>
