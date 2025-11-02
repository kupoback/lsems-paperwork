<script setup>
    import {onMounted} from "vue"
    import {RouterView} from 'vue-router'
    import {globalStore} from '@/stores/global'

    import Navigation from '@component/Navigation/Navigation'

    const store = globalStore()

    onMounted(() => {
        store.updateLogoBySeason()
    })

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
