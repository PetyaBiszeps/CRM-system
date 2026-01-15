<script setup lang="ts">
const i18n = useI18n()

const map = computed(() => {
  const address = encodeURIComponent(i18n.t('pages.contacts.address'))

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

        <p>{{ i18n.t('pages.contacts.email') }}</p>
        <p>{{ i18n.t('pages.contacts.phone') }}</p>
        <p>{{ i18n.t('pages.contacts.address') }}</p>
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
  grid-template-rows: auto 1fr auto;

  header {
    p {
      &:first-child {
        width: fit-content;
        color: $secondaryText;
        padding: 0 8px;
        font-size: $fontSizeSmall;
        border-radius: $borderRadius;
        margin-bottom: 4px;

        @include glassBg;
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

      iframe {
        border-width: 0;
      }

      p {
        margin-top: 12px;
      }
    }
  }

  footer {}
}
</style>