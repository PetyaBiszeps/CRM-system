<script setup lang="ts">
const { total, pending } = defineProps<{
  state: object
  total: number
  pending: boolean
}>()
const emit = defineEmits(['create', 'filters', 'columns', 'clear'])

const mode = defineModel<'default' | 'compact'>('mode', {
  default: 'default'
})
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

const toggleMode = () => {
  mode.value = mode.value === 'default' ? 'compact' : 'default'
}

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
        <BaseButton @click="toggleMode">
          <template #left-icon>
            {{ mode === 'default' ? '≡' : '≶' }}
          </template>
          {{ mode === 'default' ? 'default' : 'compact' }}
        </BaseButton>
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
        <BaseButton
          :disabled="page === 1 || pending"
          @click="first"
        >
          ⇐
        </BaseButton>

        <BaseButton
          :disabled="page === 1 || pending"
          @click="prev"
        >
          ←
        </BaseButton>

        <span>{{ page }} / {{ totalPages }}</span>

        <BaseButton
          :disabled="page === totalPages || pending"
          @click="next"
        >
          →
        </BaseButton>

        <BaseButton
          :disabled="page === totalPages || pending"
          @click="last"
        >
          ⇒
        </BaseButton>
      </main>
    </section>

    <section>
      <header>
        <h4>Actions</h4>
      </header>

      <main>
        <BaseButton @click="emit('create')">
          <template #left-icon>
            <Icon name="material-symbols:note-add-outline" />
          </template>
        </BaseButton>

        <BaseButton @click="emit('filters')">
          <template #left-icon>
            <Icon name="material-symbols:filter-alt-outline" />
          </template>
        </BaseButton>

        <BaseButton @click="emit('columns')">
          <template #left-icon>
            <Icon name="material-symbols:view-column-2-outline" />
          </template>
        </BaseButton>

        <BaseButton @click="emit('clear')">
          <template #left-icon>
            <Icon name="material-symbols:delete-sweep-outline" />
          </template>
        </BaseButton>
      </main>
    </section>
  </nav>
</template>