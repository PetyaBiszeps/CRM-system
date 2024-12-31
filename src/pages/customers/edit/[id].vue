<script lang="ts" setup>
import type { ICustomer } from "~/types/deals";

import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from "~/constants";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { storage } from "~/utils/appwrite";
import { v4 as uuid } from 'uuid';

useSeoMeta({
  title: `Company Edit | CRM System`,
});

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const route = useRoute();
const router = useRouter();
const customerId = route.params.id as string;

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomer>();
const { data, isSuccess } = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () =>
      DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
});

watchEffect(() => {
  if (isSuccess.value && data.value) {
    const initialData = data.value as unknown as ICustomer;
    setValues({
      name: initialData.name,
      email: initialData.email,
      avatar_url: initialData.avatar_url,
      from_source: initialData.from_source || '',
    });
  }
});

const [name, nameAttributes] = defineField('name');
const [email, emailAttributes] = defineField('email');
const [fromSource, fromSourceAttributes] = defineField('from_source');

const { mutate, isPending } = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: ICustomer) =>
      DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
});

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ['upload image'],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const response = storage.getFileDownload(STORAGE_ID, data.$id);
    setFieldValue('avatar_url', response);
  }
});

const onSubmit = handleSubmit(values => {
  mutate(values);
  router.push('/customers');
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Editing {{ (data as unknown as ICustomer)?.name }}</h1>

    <form class="form" @submit="onSubmit">
      <div class="flex flex-col gap-2">
        <UiInput v-model="name" class="input" placeholder="Name" type="text" v-bind="nameAttributes"/>
        <UiInput v-model="email" class="input" placeholder="Email" type="text" v-bind="emailAttributes"/>
        <UiInput v-model="fromSource" class="input" placeholder="Came from?" type="text" v-bind="fromSourceAttributes"/>
      </div>

      <NuxtImg v-if="values.avatar_url || isUploadImagePending" :alt="values.name" :src="values.avatar_url" class="rounded-full my-2" height="100" width="100"/>
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <UiInput :disabled="isUploadImagePending" :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])" type="file"/>
        </label>
      </div>

      <UiButton :disabled="isPending" class="border border-primary hover:bg-primary mt-2" variant="secondary">{{ isPending ? 'Loading...' : 'Save' }}</UiButton>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-border placeholder:text-[#748092] transition-colors;
}
</style>