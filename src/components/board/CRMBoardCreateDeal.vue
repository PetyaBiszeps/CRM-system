<script lang="ts" setup>
import type { IDeal } from '~/types/deals';

import { COLLECTION_DEALS, DB_ID } from "~/constants";

import { v4 as uuid } from 'uuid';
import { useMutation } from '@tanstack/vue-query';

const isOpenForm = ref(false);

interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
  customer: {
    email: string;
    name: string;
  }
  status: string;
}

const props = defineProps({
  status: { type: String, default: '' }, refetch: { type: Function }
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({ initialValues: { status: props.status } });
const [name, nameAttributes] = defineField('name');
const [price, priceAttributes] = defineField('price');
const [customerEmail, customerEmailAttributes] = defineField('customer.email');
const [customerName, customerNameAttributes] = defineField('customer.name');

const { mutate, isPending } = useMutation({
  mutationKey: ['create a new deal'],
  mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
  onSuccess() {
    props.refetch && props.refetch();
    handleReset();
  }
});

const onSubmit = handleSubmit(values => {
  mutate(values);
  isOpenForm.value = false;
});
</script>

<template>
  <div class="text-center">
    <button class="transition-all opacity-30 dark:opacity-70 hover:opacity-100 hover:text-primary" @click="isOpenForm = !isOpenForm">
      <Icon v-if="isOpenForm" class="fade-in-100 fade-out-0" name="radix-icons:arrow-up" size="36"/>
      <Icon v-else class="fade-in-100 fade-out-0" name="radix-icons:plus-circled" size="36"/>
    </button>
  </div>
  <form v-if="isOpenForm" class="form" @submit="onSubmit">
    <UiInput v-model="name" class="input" placeholder="Name" required type="text" v-bind="nameAttributes"/>
    <UiInput v-model="price" class="input" placeholder="Price" required type="number" v-bind="priceAttributes"/>
    <UiInput v-model="customerEmail" class="input" placeholder="Email" required type="text" v-bind="customerEmailAttributes"/>
    <UiInput v-model="customerName" class="input" placeholder="Company" required type="text" v-bind="customerNameAttributes"/>

    <button :disabled="isPending" class="btn">{{ isPending ? 'Loading...' : 'Add' }}</button>
  </form>
</template>

<style scoped>
.input {
  @apply mb-2 border-border transition-colors placeholder:text-foreground focus:border-primary;
}

.btn {
  @apply text-xs text-black py-1.5 px-4 border rounded border-foreground transition-colors dark:text-foreground dark:hover:text-primary hover:text-primary hover:border-primary;
}

.form {
  @apply mb-5 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-primary opacity-40;
    transform: translateY(-1rem);
  }
  to {
    @apply border-transparent opacity-100;
    transform: translateY(0);
  }
}
</style>