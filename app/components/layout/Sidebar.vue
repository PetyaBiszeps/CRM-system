<script setup lang="ts">
interface sidebarTab {
  name: string
  icon: string
  link: string
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
</script>

<template>
  <aside :class="['sidebar']">
    <header>
      <NuxtLink to="/">
        <NuxtImg
          src="favicon.svg"
          width="125"
        />
      </NuxtLink>
    </header>

    <main>
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
    </main>
  </aside>
</template>
