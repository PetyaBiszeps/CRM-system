<script setup lang="ts">
const { state, limit, total, pending } = defineProps<{
  state: object
  limit: number
  total: number
  pending: boolean
}>()

const page = defineModel<number>('page', {
  default: 1
})
const search = defineModel<string>('search')

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
      s2
    </section>

    <section>
      s3
    </section>

    <section>
      <header>
        <h4>Search</h4>
      </header>

      <main>
        <input
          v-model="search"
          type="search"
          placeholder="Search by name..."
        >
      </main>
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
            :disabled="pending"
            @click="prev"
          >
            ←
          </button>

          <button
            :disabled="pending"
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