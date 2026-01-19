<script setup lang="ts">
definePageMeta({
  title: 'login',
  layout: 'centered'
})

const {
  isLoading,
  register,
  login
} = useAuth()

const form = reactive({
  email: '',
  password: ''
})

async function handleLogin() {
  try {
    await login(form)
  }
  catch (e) {
    return e
  }
}

async function handleRegister() {
  try {
    await register(form)
  }
  catch (e) {
    return e
  }
}
</script>

<template>
  <div :class="['loginPage']">
    <section>
      <header>
        <h1>Welcome to CRM!</h1>
      </header>

      <main>
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
        </form>
      </main>

      <footer>
        <BaseButton @click="handleLogin">
          {{ isLoading ? 'Loading...' : 'Login' }}
        </BaseButton>

        <BaseButton @click="handleRegister">
          {{ isLoading ? 'Loading...' : 'Register' }}
        </BaseButton>
      </footer>
    </section>

    <section>
      <NuxtImg
        src="/loader.svg"
        alt="Loading..."
      />
    </section>
  </div>
</template>