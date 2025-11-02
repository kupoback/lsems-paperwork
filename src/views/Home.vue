<script setup>
    import {storeToRefs} from 'pinia'
    import {globalStore} from '@/stores/global'

    const store = globalStore()
    const {siteLogo} = storeToRefs(store)
</script>

<template>
    <section class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div class="w-full p-10 text-center text-white">
                <div class="mx-auto mb-10 flex max-w-xs justify-center">
                    <img
                        :src="siteLogo"
                        alt="LSEMS Logo"
                        class="mx-auto h-auto max-w-full"
                        width="150"
                        loading="lazy"
                    />
                </div>
                <h1 class="pb-4 text-5xl font-semibold leading-tight tracking-tight"> Welcome to the LSEMS Paperwork Generator </h1>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
