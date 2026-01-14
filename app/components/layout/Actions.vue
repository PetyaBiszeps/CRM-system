<script setup lang="ts">
interface sidebarButton {
  title: string
  icon: string
}

const theme = useTheme()
const isNotificationsOpen = ref<boolean>(false)

const sidebarButtons = computed<sidebarButton[]>(() => [{
  title: 'notifications',
  icon: 'material-symbols:notifications-outline',
}, {
  title: 'theme',
  icon: theme.currentIcon.value,
}, {
  title: 'logout',
  icon: 'material-symbols:exit-to-app',
}])

function toggleNotifications() {
  isNotificationsOpen.value = !isNotificationsOpen.value
}

function handleClick(button: sidebarButton) {
  if (button.title === 'notifications') {
    return toggleNotifications()
  }

  if (button.title === 'theme') {
    return theme.toggleTheme()
  }

  if (button.title === 'logout') {
    return null
  }
}
</script>

<template>
  <div :class="['actions']">
    <ul>
      <li
        v-for="button in sidebarButtons"
        :key="button.title"
      >
        <button @click="handleClick(button)">
          <Icon
            :name="button.icon"
            :title="button.title"

            size="20"
          />
        </button>
      </li>

      <SharedNotifications v-model="isNotificationsOpen" />
    </ul>
  </div>
</template>
