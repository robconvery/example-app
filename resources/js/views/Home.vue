<script setup lang="ts">
import { useForm } from '@/composables/useForm';

const form = useForm({
  name: '',
  sale: '',
})
async function submit() {
  await form.post('/jobs')
}

</script>

<template>
    <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of our Vue.js application.</p>

        <form @submit.prevent="submit" class="grid gap-3">


            <label>
            <span>Name</span>
            <input v-model="form.data.name" class="border rounded px-3 py-2" />
            <p v-if="form.errors.name" class="px-3 py-2 text-red-600 text-sm">{{ form.errors.name }}</p>
            </label>

            <label>
            <span>Sale</span>
            <input v-model="form.data.sale" class="border rounded px-3 py-2" />
            <p v-if="form.errors.sale" class="text-red-600 text-sm">{{ form.errors.sale }}</p>
            </label>

            <div>{{ form.processing.value }}</div>
            <div>{{ typeof form.processing.value }}</div>

            <button :disabled="form.processing.value" class="px-3 py-2 rounded bg-black text-white">
            {{ form.processing.value ? 'Saving…' : 'Save' }}
            </button>
        </form>

    </div>

</template>

<style scoped>

/* Borders */
.border {
    border: 1px solid #d1d5db; /* Tailwind gray-300 */
}

/* Border radius */
.rounded {
    border-radius: 0.375rem; /* 6px */
}

/* Padding */
.px-3 {
    padding-left: 0.75rem;  /* 12px */
    padding-right: 0.75rem;
}

.py-2 {
    padding-top: 0.5rem;   /* 8px */
    padding-bottom: 0.5rem;
}

/* Text colour */
.text-red-600 {
    color: #dc2626; /* Tailwind red-600 */
}

/* Text size */
.text-sm {
    font-size: 0.875rem;   /* 14px */
    line-height: 1.25rem; /* 20px */
}


</style>
