<script setup>
    import {RouterView} from 'vue-router'
    import Navigation from '@component/Navigation/Navigation.vue';
</script>

<script>
    export default {
        name: 'LSEMS AMU Paperwork App',
    };
</script>

<template>
    <div class="text-gray-900 bg-gray-100 font-serif dark:bg-gray-800 dark:text-white h-max">
        <header class="container py-2 mx-auto">
            <Navigation />
        </header>

        <main>
            <RouterView />
        </main>
    </div>
</template>

<style lang="scss" scoped></style>
