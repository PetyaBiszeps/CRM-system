<script setup lang="ts">
const { total, pending } = defineProps<{
  state: object
  total: number
  pending: boolean
}>()

const search = defineModel<string | number>('search', {
  default: ''
})
const limit = defineModel<number>('limit', {
  default: 10
})
const page = defineModel<number>('page', {
  default: 1
})

const totalPages = computed(() => {
  return Math.ceil(total / limit.value || 1)
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

watch(limit, () => {
  page.value = 1
})
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
      <select
        v-model.number="limit"
        :id="'totalSelect'"
        :name="'totalSelect'"
        :disabled="pending"
      >
        <option value="10" />
        <option value="25" />
        <option value="50" />
        <option value="100" />
        <option value="200" />
      </select>
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

          <!-- <span>{{ page }} / {{ totalPages }}</span> -->
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