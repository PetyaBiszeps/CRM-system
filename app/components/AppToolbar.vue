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
      <header>
        <h4>Shown Rows</h4>
      </header>

      <main>
        <select
          v-model.number="limit"

          :id="'totalSelect'"
          :name="'totalSelect'"
          :disabled="pending"
        >
          <option
            v-for="rows in [10, 25, 50, 100, 200]"
            :key="rows"
            :value="rows"
          >
            {{ rows }}
          </option>
        </select>
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
        <button>col</button>
        <button>fil</button>
      </main>
    </section>
  </nav>
</template>