<script setup lang="ts">
definePageMeta({
  title: 'login',
  layout: 'centered'
})

const {
  isLoading,
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
    <section>
      <h1>Welcome to CRM!</h1>

      <form @submit.prevent>
        <BaseInput
          v-model="form.email"

          id="loginEmail"
          name="loginEmail"
          type="email"
          placeholder="Enter your email..."
        />

        <BaseInput
          v-model="form.password"

          id="loginPassword"
          name="loginPassword"
          type="password"
          placeholder="Enter your password..."
        />

        <BaseButton @click="handleSubmit">
          {{ isLoading ? 'Loading...' : 'Login' }}
        </BaseButton>
      </form>
    </section>

    <section>
      <NuxtImg
        src="/loader.svg"
        alt="Loading..."
      />
    </section>
  </div>
</template>