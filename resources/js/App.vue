<script setup lang="ts">
import { computed } from 'vue'
import { pages } from './pages'

const page = (window as any).__PAGE__ ?? { component: null, props: {} }

const Component = computed(() => pages[page.component] ?? pages.Login)
</script>

<template>
    <component :is="Component" v-bind="page.props" />
</template>
