<script setup>
    import {ref, computed, watch} from 'vue'
    import {storeToRefs} from 'pinia'
    import {debounce} from 'lodash-es'
    import {globalStore} from '@stores/global'

    /**
     * UI Components
     */
    import {FwbButton, FwbInput, FwbToast} from 'flowbite-vue'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'
    import {columnWrapper, halfLeftColumn, halfRightColumn} from '@utils/css-classes'

    /**
     * Store
     */
    const store = globalStore()
    const {userData, loading} = storeToRefs(store)

    /**
     * Display helpers
     */
    const buttonText = 'Save Data'
    const savingText = 'Saving Data'
    const savedSignature = computed(() => userData.value.signature)

    /**
     * Toast state
     */
    const showToast = ref(false)
    const toastType = ref('success')
    const toastMessage = ref('Settings saved!')

    /**
     * Toast control
     */
    const triggerToast = (type = 'success', message = 'Settings saved!') => {
        toastType.value = type
        toastMessage.value = message
        showToast.value = true
        setTimeout(() => (showToast.value = false), 2500)
    }

    /**
     * Config arrays
     */
    const rankFields = [
        {
            key: 'amu',
            label: 'Advanced Medical Unit',
            placeholder: 'Doctor',
        },
        {
            key: 'ar',
            label: 'Air & Rescue',
            placeholder: 'Pilot',
        },
        {
            key: 'bls',
            label: 'BLS',
            placeholder: 'Basic Life Support Trainees',
        },
        {
            key: 'cru',
            label: 'Crisis Response Unit',
            placeholder: 'First Responder',
        },
        {
            key: 'forensics',
            label: 'Forensics',
            placeholder: 'Serologists',
        },
        {
            key: 'fr',
            label: 'Fire & Rescue',
            placeholder: 'Firefighters',
        },
        {
            key: 'ftd',
            label: 'Field Training',
            placeholder: 'Field Training Officer',
        },
        {
            key: 'mr',
            label: 'Mountain Rescue',
            placeholder: 'Mountain Rescue Operators',
        },
        {
            key: 'pr',
            label: 'Public Relations',
            placeholder: 'Public Relations Representative',
        },
        {
            key: 'red',
            label: 'Recruitment and Employment',
            placeholder: 'Application Handler',
        },
    ]

    const dayFields = [
        {key: 'monday', label: 'Monday'},
        {key: 'tuesday', label: 'Tuesday'},
        {key: 'wednesday', label: 'Wednesday'},
        {key: 'thursday', label: 'Thursday'},
        {key: 'friday', label: 'Friday'},
        {key: 'saturday', label: 'Saturday'},
        {key: 'sunday', label: 'Sunday'},
        {
            key: 'phone',
            label: 'Phone',
            placeholder: '555-5555',
        },
    ]

    /**
     * Save logic
     */
    const saveFields = async () => {
        store.loading = true
        try {
            await store.saveUserData()
            triggerToast('success', 'Settings saved successfully!')
        } catch (error) {
            console.error(error)
            triggerToast('error', 'Failed to save settings.')
        } finally {
            store.loading = false
        }
    }

    /**
     * Debounced auto-save watcher
     */
    const saveDebounced = debounce(() => {
        try {
            store.saveUserData()
            triggerToast('info', 'Settings auto-saved.')
        } catch (error) {
            triggerToast('error', 'Auto-save failed.')
        }
    }, 800)

    watch(userData, () => saveDebounced(),{deep: true})
</script>

<template>
    <div class="relative page-settings w-full overflow-hidden rounded-lg ring-1 ring-slate-900/10 dark:ring-slate-100/10">
        <div class="mx-auto max-w-8xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto max-w-8xl">
                <BodyHeader
                    title="Profile Settings"
                    body="This information is stored in your browser's localStorage. Clearing it will remove your data."
                />

                <div class="mx-auto max-w-3xl">
                    <!-- Name / Rank -->
                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model.lazy="userData.name"
                                placeholder="FName LName"
                                label="Your name"
                                size="md"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model.lazy="userData.rank"
                                placeholder="Department Rank"
                                label="Your Rank"
                                size="md"
                            />
                        </fieldset>
                    </div>

                    <!-- Divisional Ranks -->
                    <div :class="columnWrapper">
                        <h3 class="mb-4 w-full">Divisional Ranks</h3>
                        <fieldset
                            v-for="(field, index) in rankFields"
                            :key="field.key"
                            :class="[index % 2 === 0 ? halfLeftColumn : halfRightColumn]"
                        >
                            <FwbInput
                                v-model.lazy="userData.divisionalRanks[field.key]"
                                :label="field.label"
                                :placeholder="field.placeholder"
                                size="md"
                                block-classes="mb-4"
                            />
                        </fieldset>
                    </div>

                    <!-- Signature -->
                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model.lazy="userData.signature"
                                label="Signature Url"
                                size="md"
                            />
                        </fieldset>
                        <fieldset
                            v-if="savedSignature"
                            :class="halfRightColumn"
                        >
                            <p class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your saved signature</p>
                            <div class="w-full bg-white p-4">
                                <img
                                    class="mx-auto max-h-32 object-contain"
                                    :src="savedSignature"
                                    alt="Signature Image"
                                />
                            </div>
                        </fieldset>
                    </div>

                    <!-- Availability / Phone -->
                    <div :class="columnWrapper">
                        <h3 class="mb-4 w-full">Leave empty for no availability</h3>
                        <fieldset
                            v-for="({key, label, placeholder}, index) in dayFields"
                            :key="key"
                            :class="[index % 2 === 0 ? halfLeftColumn : halfRightColumn]"
                        >
                            <FwbInput
                                v-model.lazy="userData[key]"
                                :label="label"
                                :placeholder="placeholder ?? '01:00 - 22:00'"
                                size="md"
                                block-classes="mb-4"
                            />
                        </fieldset>
                    </div>
                </div>

                <!-- Save Button -->
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <fieldset class="my-8">
                        <FwbButton
                            v-if="loading"
                            disabled
                            color="alternative"
                            size="lg"
                        >
                            {{ savingText }}
                        </FwbButton>
                        <FwbButton
                            v-else
                            size="lg"
                            @click="saveFields"
                        >
                            {{ buttonText }}
                        </FwbButton>
                    </fieldset>
                </div>
            </div>
        </div>

        <!-- Toast -->
        <transition name="fade">
            <div
                v-if="showToast"
                class="fixed bottom-6 right-6 z-50"
            >
                <FwbToast :type="toastType">
                    <template #icon>
                        <svg
                            v-if="toastType === 'success'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        <svg
                            v-else-if="toastType === 'info'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10A8 8 0 11.001 10 8 8 0 0118 10zm-9-4a1 1 0 102 0 1 1 0 00-2 0zm2 8H9V9h2v5z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-4.707a1 1 0 011.414 0L10 10.414l2.293 2.879a1 1 0 101.414-1.414L11.414 9l2.293-2.293a1 1 0 10-1.414-1.414L10 7.586 7.707 5.293a1 1 0 00-1.414 1.414L8.586 9l-2.293 2.293a1 1 0 000 1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </template>
                    {{ toastMessage }}
                </FwbToast>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
