<script setup>
    defineProps({
        title: String,
    })
</script>

<template>
    <div class="mx-auto">
        <h3
            class="text-2xl font-bold leading-7 text-gray-900 dark:text-white underline"
            v-html="title"
        />
    </div>
</template>
