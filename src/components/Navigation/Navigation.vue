<script setup>
    /**
     * Scripts
     */
    import {onMounted} from 'vue'
    import {storeToRefs} from 'pinia'
    import {globalStore} from '@/stores/global'
    import {routes} from '@/router'
    import {RouterLink} from 'vue-router'

    /**
     * Components
     */
    import NavItems from '@/components/Navigation/Components/NavItems.vue'
    import {FwbNavbar, FwbNavbarCollapse} from 'flowbite-vue'

    /**
     * Store setup
     */
    const store = globalStore()
    const {darkMode, siteLogo, userData} = storeToRefs(store)

    /**
     * Lifecycle
     */
    onMounted(() => {
        store.loadThemePreference()

        /**
         * Does a system theme sync if never toggled
         */
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('darkMode')) {
                store.darkMode = e.matches
                document.body.classList.toggle('dark', e.matches)
            }
        })
    })

    /**
     * Toggle theme
     */
    const toggleLightDark = () => store.toggleDarkMode()
</script>

<template>
    <FwbNavbar>
        <!-- Logo -->
        <template #logo>
            <RouterLink
                to="/"
                class="flex flex-shrink-0 items-center"
            >
                <img
                    :src="siteLogo"
                    alt="LSEMS Paperwork Generator"
                    class="mr-3 h-6 sm:h-10"
                    loading="lazy"
                />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"> LSEMS Paperwork </span>
            </RouterLink>
        </template>

        <!-- Center Nav Items -->
        <template #default="{isShowMenu}">
            <FwbNavbarCollapse
                :is-show-menu="isShowMenu"
                class="nav-items mx-auto flex w-full flex-1 justify-center md:mx-2 md:w-auto md:px-2"
            >
                <NavItems
                    v-for="{children, lowerName, name, path} in routes"
                    :key="name"
                    :children="children"
                    :lowerName="lowerName"
                    :name="name"
                    :path="path"
                />
            </FwbNavbarCollapse>
        </template>

        <!-- Right Side (User + Theme Toggle) -->
        <template #right-side>
            <div class="ml-4 flex items-center gap-4 md:ml-6">
                <p
                    v-if="userData.name"
                    class="hidden text-sm text-gray-700 dark:text-gray-300 sm:block"
                >
                    Welcome, {{ userData.name }}!
                </p>

                <button
                    id="theme-toggle"
                    type="button"
                    class="relative rounded p-1 text-gray-400 hover:text-yellow-300 focus:outline-none dark:text-white dark:hover:text-gray-500"
                    aria-label="Toggle theme"
                    @click="toggleLightDark"
                >
                    <!-- Sun icon (light mode) -->
                    <svg
                        v-if="!darkMode"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>

                    <!-- Moon icon (dark mode) -->
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        />
                    </svg>
                </button>
            </div>
        </template>
    </FwbNavbar>
</template>

<style scoped></style>
