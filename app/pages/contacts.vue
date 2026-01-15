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