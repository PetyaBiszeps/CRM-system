<script setup lang="ts">
interface sidebarButton {
  title: string
  icon: string
}

const sidebarButtons: sidebarButton[] = [{
  title: 'notifications',
  icon: 'material-symbols:notifications-outline',
}, {
  title: 'theme',
  icon: 'material-symbols:light-mode-outline',
}, {
  title: 'logout',
  icon: 'material-symbols:exit-to-app',
}]

const theme = useTheme()
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
