<script setup lang="ts">
import type {
  IDockButton
} from '~/types'

const i18n = useI18n()
const theme = useTheme()
const isNotificationsOpen = ref<boolean>(false)
const {
  logout
} = useAuth()

const dockButtons = computed<IDockButton[]>(() => [{
  id: 'notifications',
  icon: 'material-symbols:notifications-outline',
  title: i18n.t('components.dock.titles.notifications')
}, {
  id: 'language',
  icon: 'material-symbols:keyboard-alt-outline',
  title: i18n.t('components.dock.titles.language')
}, {
  id: 'theme',
  icon: theme.currentIcon.value,
  title: i18n.t('components.dock.titles.theme')
}, {
  id: 'logout',
  icon: 'material-symbols:exit-to-app',
  title: i18n.t('components.dock.titles.logout')
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

function handleClick(button: IDockButton) {
  if (button.id === 'notifications') {
    return toggleNotifications()
  }

  if (button.id === 'language') {
    return toggleLanguage()
  }

  if (button.id === 'theme') {
    return theme.toggleTheme()
  }

  if (button.id === 'logout') {
    return logout()
  }
}
</script>

<template>
  <div :class="['dockWrapper']">
    <ul>
      <li
        v-for="button in dockButtons"
        :key="button.id"
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