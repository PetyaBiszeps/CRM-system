<script setup lang="ts">
const { limit, total, pending } = defineProps<{
  state: object
  limit: number
  total: number
  pending: boolean
}>()

const page = defineModel<number>('page', {
  default: 1
})
const search = defineModel<string | number>('search', {
  default: ''
})

const totalPages = computed(() => {
  return Math.ceil(total / limit || 1)
})

const first = () => {
  return page.value = 1
}

const prev = () => {
  if (page.value > 1) {
    return page.value--
  }
}

const next = () => {
  if (page.value < totalPages.value) {
    return page.value++
  }
}

const last = () => {
  return page.value = totalPages.value
}
</script>

<template>
  <nav :class="['toolbarWrapper']">
    <section>
      s1
    </section>

    <section>
      <header>
        <h4>Search</h4>
      </header>

      <main>
        <BaseInput
          v-model="search"

          id="globalSearchInput"
          name="globalSearchInput"
          type="search"
          placeholder="Search..."
          :disabled="false"
          :readonly="false"
          autocomplete="off"
        />
      </main>
    </section>

    <section>
      s3
    </section>

    <section>
      limit
    </section>

    <section>
      <header>
        <h4>Pagination</h4>

        <main>
          <button
            :disabled="page === 1 || pending"
            @click="first"
          >
            ⇐
          </button>

          <button
            :disabled="page === 1 || pending"
            @click="prev"
          >
            ←
          </button>

          <span>9999999 / 9999999</span>

          <button
            :disabled="page === totalPages || pending"
            @click="next"
          >
            →
          </button>

          <button
            :disabled="page === totalPages || pending"
            @click="last"
          >
            ⇒
          </button>
        </main>
      </header>
    </section>
  </nav>
</template>