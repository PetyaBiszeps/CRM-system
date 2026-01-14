<script setup lang="ts">
interface sidebarTab {
  name: string
  icon: string
  link: string
}

interface sidebarButton {
  title: string
  icon: string
}

const sidebarTabs: sidebarTab[] = [{
  name: 'Dashboard',
  icon: 'material-symbols:interactive-space-outline',
  link: '/',
}, {
  name: 'Goods',
  icon: 'material-symbols:shopping-bag-speed-outline',
  link: '/goods',
}, {
  name: 'Settings',
  icon: 'material-symbols:settings-input-component-outline',
  link: '/settings',
}, {
  name: 'Contact Us',
  icon: 'material-symbols:settings-phone-outline',
  link: '/contact',
}]

const sidebarButtons: sidebarButton[] = [{
  title: 'theme',
  icon: 'material-symbols:light-mode-outline',
}, {
  title: 'notifications',
  icon: 'material-symbols:notifications-outline',
}, {
  title: 'logout',
  icon: 'material-symbols:exit-to-app',
}]
</script>

<template>
  <aside :class="['sidebar']">
    <header>
      <ul>
        <li
          v-for="button in sidebarButtons"
          :key="button.title"
        >
          <button @click="null">
            <Icon
              :name="button.icon"
              :title="button.title"

              size="20"
            />
          </button>
        </li>
      </ul>
    </header>

    <main>
      <NuxtLink to="/">
        <NuxtImg
          src="favicon.svg"
          width="125"
        />
      </NuxtLink>
    </main>

    <footer>
      <ul>
        <li
          v-for="tab in sidebarTabs"
          :key="tab.link"
        >
          <NuxtLink :to="tab.link">
            <Icon :name="tab.icon" />

            <p>{{ tab.name }}</p>
          </NuxtLink>
        </li>
      </ul>
    </footer>
  </aside>
</template>
