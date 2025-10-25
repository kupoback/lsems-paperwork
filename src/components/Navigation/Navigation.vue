<script setup>
    import {globalStore} from '@/stores/global'
    import {computed} from 'vue'
    import {routes} from '@/router'
    import {FwbNavbar, FwbNavbarCollapse} from 'flowbite-vue'
    import NavItems from '@/components/Navigation/Components/NavItems.vue'
    import {RouterLink} from "vue-router";

    const store = globalStore()
    const docBodyClass = document.body.classList

    if (store.darkMode) docBodyClass.add('dark')

    const toggleLightDark = () => {
        docBodyClass.toggle('dark')
        store.darkMode = !store.darkMode
    }
    const isDark = computed(() => store.darkMode)
    const logo = computed(() => store.siteLogo)
    const name = computed(() => store.userData.name || '')
</script>

<template>
    <FwbNavbar>
        <template #logo>
            <RouterLink
                :to="'/'"
                class="flex items-center flex-shrink-0">
                <img
                    :src="logo"
                    alt="AMU Paperwork Generator"
                    class="mr-3 h-6 sm:h-10"
                />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"> AMU Paperwork Generator </span>
            </RouterLink>
        </template>
        <template #default="{isShowMenu}">
            <FwbNavbarCollapse
                :is-show-menu="isShowMenu"
                class="flex flex-1 w-full justify-center md:w-auto mx-auto md:mx-2 md:px-2 nav-items"
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
        <template #right-side>
            <div class="ml-4 flex items-center md:ml-6">
                <p
                    v-if="name"
                    v-html="`Welcome, ${name}!`"
                />
                <button
                    id="theme-toggle"
                    type="button"
                    class="relative p-1 text-gray-400 hover:text-yellow-200 focus:outline-none dark:text-white dark:hover:text-gray-500 dark:ring-white"
                    @click="toggleLightDark"
                >
                    <svg
                        id="theme-toggle-dark-icon"
                        class="w-6 h-6"
                        :class="{hidden: isDark}"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <svg
                        id="theme-toggle-light-icon"
                        class="w-6 h-6"
                        fill="currentColor"
                        :class="{hidden: !isDark}"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </template>
    </FwbNavbar>
</template>

<script>
    export default {
        name: 'Navigation',
    }
</script>

<style scoped lang="scss"></style>
