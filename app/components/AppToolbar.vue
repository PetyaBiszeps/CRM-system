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
      <header>
        <h4>Mode</h4>
      </header>

      <main>
        <button>Default</button>
      </main>
    </section>

    <section>
      <header>
        <h4>Global Search</h4>
      </header>

      <main>
        <BaseInput
          v-model="search"

          id="globalSearchInput"
          name="globalSearchInput"
          type="search"
          placeholder="Search..."
        />
      </main>
    </section>

    <section>
      <header>
        <h4>Rows</h4>
      </header>

      <main>
        <BaseSelect
          v-model.number="limit"

          :id="'totalSelect'"
          :name="'totalSelect'"
          :options="[{
            id: '10', value: 10,
          }, {
            id: '25', value: 25,
          }, {
            id: '50', value: 50,
          }, {
            id: '100', value: 100,
          }, {
            id: '200', value: 200,
          }]"
          :disabled="pending"
        />
      </main>
    </section>

    <section>
      <header>
        <h4>Pagination</h4>
      </header>

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
    </section>

    <section>
      <header>
        <h4>Actions</h4>
      </header>

      <main>
        <button>select all</button>
        <button>columns</button>
        <button>filters</button>
        <button>reset</button>
      </main>
    </section>
  </nav>
</template>