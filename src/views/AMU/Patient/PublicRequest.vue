<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {publicRequestStore} from '@stores/public-request'
    import {generatePublicRequest} from '@templates/patient/public-request'
    import {reactive, ref} from 'vue'
    import router from '@/router'
    import {
        columnWrapper,
        halfLeftColumn,
        halfRightColumn,
    } from "@utils/css-classes"

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import BodyHeader from '@component/BodyHeader/BodyHeader'

    const {links, userData} = globalStore()
    const store = publicRequestStore()
    const {data, defaultData} = reactive({
        ...store.$state,
    })

    const {fullName, contactMethod, details} = reactive(data)

    const savedFullName = ref(fullName)
    const savedContactMethod = ref(contactMethod)
    const savedDetails = ref(details)
    //endregion

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generatePublicRequest(publicRequestStore().data, userData, links.publicRequest, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/amu//patient/public-request')
    }
    //endregion
</script>

<template>
    <div class="prescription w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100 pb-20">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Public Request"
                    body="This page is used to create a public request response."
                />
                <div class="pb-4">
                    <p class="mt-1 leading-6 text-gray-600 dark:text-white"> Date and time will be converted to UTC from your local timezone. You can manually edit the time if you wish. Please use 24 hour formats. </p>
                    <div :class=columnWrapper>
                        <!-- Full Name -->
                        <fieldset :class=halfLeftColumn>

                            <FwbInput
                                v-model="savedFullName"
                                placeholder="FName LName"
                                label="Patients Name"
                                size="md"
                                @focusout="updateState('fullName', savedFullName)"
                            />
                        </fieldset>
                        <!-- Contact Method -->
                        <fieldset :class=halfRightColumn>
                            <FwbInput
                                v-model="savedContactMethod"
                                placeholder="Email"
                                label="Contact Type"
                                size="md"
                                @focusout="updateState('contactMethod', savedContactMethod)"
                            />
                        </fieldset>
                    </div>
                    <!-- Details -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedDetails"
                            placeholder="Patient has..."
                            label="Contact Details"
                            size="md"
                            row="4"
                            @focusout="updateState('details', savedDetails)"
                        />
                    </fieldset>
                </div>
                <div class="max-w-2xl flex md:block justify-between">
                    <FwbButton
                        color="default"
                        size="lg"
                        class="md:mr-4"
                        @click="copyContentsForGov"
                    >
                        Copy to Gov
                    </FwbButton>
                    <FwbButton
                        color="yellow"
                        size="lg"
                        class="md:mx-4"
                        @click="copyContents"
                    >
                        Copy
                    </FwbButton>
                    <FwbButton
                        color="red"
                        size="lg"
                        class="md:ml-4"
                        @click="reset"
                    >
                        Clear
                    </FwbButton>
                </div>
            </div>
            <div id="output"></div>
        </div>
    </div>
</template>

<script></script>

<style scoped lang="scss"></style>
