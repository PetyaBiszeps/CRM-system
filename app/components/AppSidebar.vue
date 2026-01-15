<script setup lang="ts">
import type {
  ISidebarTab
} from '~/types'

const i18n = useI18n()

const sidebarTabs = computed<ISidebarTab[]>(() => [{
  name: i18n.t('components.sidebar.tabs.dashboard'),
  icon: 'material-symbols:interactive-space-outline',
  link: '/'
}, {
  name: i18n.t('components.sidebar.tabs.goods'),
  icon: 'material-symbols:shopping-bag-speed-outline',
  link: '/goods'
}, {
  name: i18n.t('components.sidebar.tabs.payments'),
  icon: 'material-symbols:payment-card-outline',
  link: '/payments'
}, {
  name: i18n.t('components.sidebar.tabs.orders'),
  icon: 'material-symbols:delivery-truck-speed-outline',
  link: '/orders'
}, {
  name: i18n.t('components.sidebar.tabs.customers'),
  icon: 'material-symbols:person-outline',
  link: '/customers'
}, {
  name: i18n.t('components.sidebar.tabs.settings'),
  icon: 'material-symbols:settings-input-component-outline',
  link: '/settings'
}, {
  name: i18n.t('components.sidebar.tabs.contacts'),
  icon: 'material-symbols:settings-phone-outline',
  link: '/contacts'
}])
</script>

<template>
  <aside :class="['sidebarWrapper']">
    <header>
      <NuxtLink to="/">
        <NuxtImg
          src="favicon.svg"
          width="200"
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