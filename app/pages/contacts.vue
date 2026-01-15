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
      <p>CRM / {{ i18n.t('pages.contacts.title') }}</p>
      <p>{{ i18n.t('pages.contacts.description') }}</p>
    </header>

    <main>
      <section>
        <h2>{{ i18n.t('pages.contacts.title') }}</h2>

        <p>Email: {{ i18n.t('pages.contacts.email') }}</p>
        <p>Phone: {{ i18n.t('pages.contacts.phone') }}</p>
        <p>Address: {{ i18n.t('pages.contacts.address_value') }}</p>
      </section>

      <section>
        <h2>{{ i18n.t('pages.contacts.address') }}</h2>

        <iframe
          :src="map"

          width="100%"
          height="100%"
          allowfullscreen
        />
      </section>
    </main>

    <footer>
      <p>{{ i18n.t('pages.contacts.copyright') }}</p>
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

  header {
    p {
      &:first-child {
        font-size: 0.8em;
        margin-bottom: 8px;
      }
    }
  }

  main {
    gap: 32px;
    display: grid;
    grid-template-columns: 0.6fr 1fr;

    section {
      overflow: hidden;
      border-radius: $borderRadius;

      p {
        margin-top: 12px;
      }
    }
  }

  footer {}
}
</style>