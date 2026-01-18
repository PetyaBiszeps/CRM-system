<script setup lang="ts">
definePageMeta({
  title: 'login',
  layout: 'centered'
})

const {
  isLoading,
  error,
  login
} = useAuth()

const form = reactive({
  email: '',
  password: ''
})

async function handleSubmit() {
  try {
    await login(form)
  }
  catch (e) {
    return e
  }
}
</script>

<template>
  <div :class="['loginPage']">
    <h1>Welcome to CRM!</h1>

    <form @submit.prevent>
      <BaseInput v-model="form.email" />
      <BaseInput v-model="form.password" />

      <BaseButton @click="handleSubmit">
        {{ isLoading ? 'Loading...' : 'Login' }}
      </BaseButton>
    </form>
  </div>
</template>