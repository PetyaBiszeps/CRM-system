<script lang="ts" setup>
import type { ICustomer } from "~/types/deals";

import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from "~/constants";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { v4 as uuid } from 'uuid';

useSeoMeta({
  title: `Editing Company`,
});

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

interface ICustomerFormState extends Pick<ICustomer, 'name' | 'email' | 'avatar_url' | 'from_source'> {

}

const route = useRoute();
const customerId = route.params.id as string;

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormState>();
const { data, isSuccess } = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () =>
      DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
});

watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState;
  setValues({
    name: initialData.name,
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || '',
  });
});

const [name, nameAttributes] = defineField('name');
const [email, emailAttributes] = defineField('email');
const [fromSource, fromSourceAttributes] = defineField('from_source');

const { mutate, isPending } = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: ICustomerFormState) =>
      DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
});

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ['upload image'],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const response = storage.getFileDownload(STORAGE_ID, data.$id);
    setFieldValue('avatar_url', response.href);
  }
});

const onSubmit = handleSubmit(values => {
  mutate(values);
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Editing {{ (data as unknown as ICustomerFormState)?.name }}</h1>

    <form class="form" @submit="onSubmit">
      <UiInput v-model="name" class="input" placeholder="Name" type="text" v-bind="nameAttributes"/>
      <UiInput v-model="email" class="input" placeholder="Email" type="text" v-bind="emailAttributes"/>
      <UiInput v-model="fromSource" class="input" placeholder="Came from?" type="text" v-bind="fromSourceAttributes"/>

      <NuxtImg v-if="values.avatar_url || isUploadImagePending" :alt="values.name" :src="values.avatar_url" class="rounded-full my-2" height="50" width="50"/>
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">
            <UiInput :disabled="isUploadImagePending" :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])" type="file"/>
          </div>
        </label>
      </div>

      <UiButton :disabled="isPending" class="mt-3" variant="secondary">{{ isPending ? 'Loading...' : 'Save' }}</UiButton>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>