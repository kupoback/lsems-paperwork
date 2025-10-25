<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {methadoneStore} from '@stores/methadone'
    import {generateMethadone} from '@templates/prescriptions/methadone'
    import {reactive, ref} from 'vue'
    import router from '@/router'
    import {
        columnWrapper,
        halfLeftColumn,
        halfRightColumn,
        thirdLeftColumn,
        thirdMiddleColumn,
        thirdRightColumn,
    } from "@/util/css-classes"

    /**
     * Vue Components
     */
    import {FwbButton, FwbCheckbox, FwbInput, FwbTextarea} from 'flowbite-vue'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'

    const {links, userData} = globalStore()
    const store = methadoneStore()
    const {data, defaultData} = reactive({...store.$state})

    const {fullName, phoneNumber, drugsFound, prescription, amountIssued, educated} = reactive(data)

    //region Saved Data
    const savedFullName = ref(fullName)
    const savedPhoneNumber = ref(phoneNumber)
    const savedDrugsFound = ref(drugsFound)
    const savedPrescription = ref(prescription)
    const savedAmountIssued = ref(amountIssued)
    const savedEducated = ref(educated)
    //endregion

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateMethadone(methadoneStore().data, userData, links.prescription, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/prescription/methadone')
    }
    //endregion
</script>

<template>
    <div class="prescription w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Methadone Prescription"
                    body="This page is used to create a prescription for methadone."
                />
                <div class="pb-4">
                    <p class="mt-1 leading-6 text-gray-600 dark:text-white"> The dates will be converted to UTC </p>
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
                        <!-- Phone Number -->
                        <fieldset :class=halfRightColumn>
                            <FwbInput
                                v-model="savedPhoneNumber"
                                placeholder="5551234"
                                label="Patients Phone Number"
                                size="md"
                                @focusout="updateState('phoneNumber', savedPhoneNumber)"
                            />
                        </fieldset>
                    </div>
                    <!-- Drugs Found -->
                    <fieldset class="my-2 md:my-8">
                        <FwbTextarea
                            v-model="savedDrugsFound"
                            placeholder="Patient tested positive for..."
                            label="Drugs Found"
                            size="md"
                            rows="2"
                            @focusout="updateState('drugsFound', savedDrugsFound)"
                        />
                    </fieldset>
                    <div :class=columnWrapper>
                        <!-- Prescription -->
                        <fieldset :class=thirdLeftColumn>
                            <FwbInput
                                v-model="savedPrescription"
                                placeholder="Methadone"
                                label="Prescription"
                                size="md"
                                @focusout="updateState('prescription', savedPrescription)"
                            />
                        </fieldset>
                        <!-- Amount Prescribed -->
                        <fieldset :class=thirdMiddleColumn>
                            <FwbInput
                                v-model="savedAmountIssued"
                                placeholder="10"
                                label="Amount Prescribed"
                                size="md"
                                @focusout="updateState('amountIssued', savedAmountIssued)"
                            />
                        </fieldset>
                        <fieldset :class=thirdRightColumn>
                            <p class="block mb-5 text-sm font-medium text-gray-900 dark:text-white">
                                Was the patient educated?
                            </p>
                            <FwbCheckbox
                                v-model="savedEducated"
                                label="Patient Educated"
                                @focusout="updateState('educated', savedEducated)"
                                />
                        </fieldset>
                    </div>
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
