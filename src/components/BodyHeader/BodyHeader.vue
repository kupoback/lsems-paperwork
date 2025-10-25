<script setup>
    defineProps({
        title: {
            type: String,
            default: '',
        },
        body: {
            type: String,
            default: '',
        }
    })
</script>

<template>
    <div class="max-w-3xl mx-auto text-center pb-8">
        <h2
            class="text-4xl font-bold leading-7 text-gray-900 dark:text-white pb-4"
            v-html="title"
        />
        <p
            class="mt-1 text-sm leading-6 text-gray-600 dark:text-white"
            v-html="body"
        />
    </div>
</template>

<script>
    export default {
        name: 'BodyHeader',
    }
</script>
