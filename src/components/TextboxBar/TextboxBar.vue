<script setup>
    import {textboxBarFormatStore} from '@/stores/textboxbar'

    const store = textboxBarFormatStore()

    const handleClick = () => {
        store.insertSpoiler()
      }

</script>

<template>
    <div class="appointment-format w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl">
            <button
                class="bg-blue-600 text-white p-2 rounded"
                @click="handleClick"
            >
                Add Spoiler Tag
            </button>
        </div>
    </div>
</template>
