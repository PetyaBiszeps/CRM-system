<script setup lang="ts">
interface sidebarButton {
  title: string
  icon: string
}

const i18n = useI18n()
const theme = useTheme()
const isNotificationsOpen = ref<boolean>(false)

const sidebarButtons = computed<sidebarButton[]>(() => [{
  title: 'notifications',
  icon: 'material-symbols:notifications-outline',
}, {
  title: 'language',
  icon: 'material-symbols:keyboard-alt-outline',
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

async function toggleLanguage() {
  const next = i18n.locales.value
    .find(locale => locale.code !== i18n.locale.value)

  if (next) {
    await i18n.setLocale(next.code)
  }
}

function handleClick(button: sidebarButton) {
  if (button.title === 'notifications') {
    return toggleNotifications()
  }

  if (button.title === 'language') {
    return toggleLanguage()
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
