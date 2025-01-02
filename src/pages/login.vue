<script lang="ts" setup>
import { v4 as uuid } from 'uuid'

useSeoMeta({
  title: 'Login | CRM System'
});

const nameRef = ref('');
const emailRef = ref('');
const passwordRef = ref('');

const router = useRouter();
const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();

const login = async () => {
  try {
    isLoadingStore.set(true);
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

    const response = await account.get();

    if (response) {
      authStore.set({
        name: response.name,
        email: response.email,
        status: response.status
      });
    }

    await router.push('/');
  } catch (error) {
    await router.push('/login');
  } finally {
    setTimeout(() => {
      nameRef.value = '';
      emailRef.value = '';
      passwordRef.value = '';

      isLoadingStore.set(false);
    }, 500);
  }
};

const register = async () => {
  await account.create(uuid(), emailRef.value, passwordRef.value);
  await login();
};
</script>

<template>
  <div class="flex items-center justify-center w-full min-h-screen">
    <div class="w-full max-w-2xl p-5 border-2 rounded ">
      <h1 class="mb-5 text-center text-2xl font-bold">Sign in</h1>

      <form>
        <UiInput v-model="nameRef" class="mb-3" placeholder="Name" type="name"/>
        <UiInput v-model="emailRef" autocomplete="email" class="mb-3" placeholder="Email" type="email"/>
        <UiInput v-model="passwordRef" autocomplete="current-password" class="mb-3" placeholder="Password" type="password"/>

        <div class="flex items-center justify-center gap-5">
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>