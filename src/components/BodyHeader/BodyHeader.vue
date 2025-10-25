<script setup>
    /**
     * Props
     */
    defineProps({
        title: String,
        body: String,
    })
</script>

<template>
    <div class="mx-auto max-w-3xl pb-8 text-center">
        <h2
            v-if="title"
            class="pb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white"
            v-html="title"
        />
        <p
            v-if="body"
            class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300"
            v-html="body"
        />
    </div>
</template>
