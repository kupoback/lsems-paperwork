<script setup>
    import {RouterLink} from 'vue-router'
</script>

<template>
    <li class="flex items-center">
        <div v-if="children && children.length">
            <button
                :id="lowerName"
                :data-dropdown-toggle="`${lowerName}-children`"
                class="flex items-center justify-between w-full py-2 px-3 rounded text-sm font-bold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 md:w-auto dark:text-white md:dark:hover:text-gray-400 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
                {{ name }}
                <svg
                    class="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <div
                :id="`${lowerName}-children`"
                class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
                <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-400"
                    :aria-labelledby="lowerName"
                >
                    <li
                        v-for="{name, path} in children"
                        :key="name"
                    >
                        <RouterLink
                            :key="name"
                            :to="path"
                            class="block rounded-md p-2 md:px-3 md:py-2 text-sm font-bold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            {{ name }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <RouterLink
            v-else
            :key="name"
            :to="path"
            class="rounded-md p-2 md:px-3 md:py-2 text-sm font-bold md:hover:text-gray-400 dark:text-white md:dark:hover:text-gray-400"
        >
            {{ name }}
        </RouterLink>
    </li>
</template>

<script>
    export default {
        props: {
            children: {
                type: [Array, Object],
                defaut: [],
            },
            lowerName: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                default: '',
            },
            path: {
                type: String,
                default: '',
            },
        },
        name: 'NavItems',
    }
</script>

<style scoped lang="scss"></style>
