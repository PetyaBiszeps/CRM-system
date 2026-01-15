<script setup lang="ts">
const i18n = useI18n()

const map = computed(() => {
  const address = encodeURIComponent(i18n.t('pages.contacts.address_value'))

  return `https://maps.google.com/maps?q=${address}&t=&z=15&ie=UTF8&iwloc=&output=embed`
})
</script>

<template>
  <div :class="['contactsPage']">
    <header>
      <h1>Some header text</h1>
    </header>

    <main>
      <section>
        <h1>{{ i18n.t('pages.contacts.address') }}</h1>
      </section>

      <section>
        <iframe
          :src="map"

          width="100%"
          height="100%"
          allowfullscreen
        />
      </section>
    </main>

    <footer>
      <h1>Some footer text</h1>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/resources.scss' as *;

.contactsPage {
  gap: 32px;
  height: 100%;
  display: grid;
  padding: 24px;
  grid-template-rows: auto 1fr auto;

  header {}

  main {
    gap: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    section {
      border-radius: $borderRadius;
    }
  }

  footer {}
}
</style>