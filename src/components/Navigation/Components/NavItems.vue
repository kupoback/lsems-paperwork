<script setup>
    /**
     * Scripts
     */
    import {RouterLink} from 'vue-router'
    import {onBeforeUnmount, ref, computed, toRefs} from 'vue'

    /**
     * Props
     */
    const props = defineProps({
        children: {
            type: Array,
            default: () => [],
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
    })

    const {children, lowerName, name, path} = toRefs(props)

    /**
     * Reactive state for dropdown visibility
     */
    const isOpen = ref(false)
    const hasChildren = computed(() => Array.isArray(children.value) && children.value.length > 0)

    onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))

    /**
     * Toggle dropdown visibility
     */
    const toggleDropdown = () => (isOpen.value = !isOpen.value)

    /**
     * Close dropdown when clicking outside
     */
    const onClickOutside = event => {
        const target = event.target
        if (!target.closest(`#${lowerName.value}-dropdown`)) {
            isOpen.value = false
        }
    }

    document.addEventListener('click', onClickOutside)
</script>

<template>
    <li
        class="relative flex items-center"
        :id="`${lowerName}-dropdown`"
    >
        <!-- Dropdown parent -->
        <div v-if="hasChildren">
            <button
                type="button"
                class="flex w-full items-center justify-between rounded px-3 py-2 text-sm font-semibold hover:bg-gray-100 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-gray-400 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent md:dark:hover:text-gray-400"
                @click.stop="toggleDropdown"
            >
                {{ name }}
                <svg
                    class="ms-2.5 h-2.5 w-2.5 transition-transform duration-200"
                    :class="{'rotate-180': isOpen}"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="m1 1 4 4 4-4"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>

            <transition name="fade">
                <div
                    v-if="isOpen"
                    class="absolute left-0 z-20 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700"
                >
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
                        <li
                            v-for="{name: childName, path: childPath} in children"
                            :key="childName"
                        >
                            <RouterLink
                                :to="childPath"
                                class="block rounded-md p-2 text-sm font-semibold hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:px-3 md:py-2"
                                @click="isOpen = false"
                            >
                                {{ childName }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>

        <!-- Single link -->
        <RouterLink
            v-else
            :to="path"
            class="rounded-md p-2 text-sm font-semibold dark:text-white hover:text-gray-400 md:px-3 md:py-2 md:dark:hover:text-gray-400"
        >
            {{ name }}
        </RouterLink>
    </li>
</template>

<style scoped lang="scss"></style>
