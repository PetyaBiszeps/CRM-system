<script setup lang="ts">
interface sidebarTab {
  name: string
  icon: string
  link: string
}

const sidebarTab: sidebarTab[] = [{
  name: 'Dashboard',
  icon: 'material-symbols:interactive-space-outline',
  link: '/',
}, {
  name: 'Goods',
  icon: 'material-symbols:shopping-bag-speed-outline',
  link: '/goods',
}]
</script>

<template>
  <aside :class="['sidebar']">
    <NuxtImg
      src="favicon.svg"
      width="125"
    />

    <ul>
      <li
        v-for="tab in sidebarTab"
        :key="tab.link"
      >
        <NuxtLink :to="tab.link">
          <Icon :name="tab.icon" />

          <p>{{ tab.name }}</p>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>
