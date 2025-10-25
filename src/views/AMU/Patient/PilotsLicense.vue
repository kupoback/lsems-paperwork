<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {pilotsLicenseStore} from '@stores/pilots-license'
    import {generateSaaaPilots} from '@templates/patient/saaa-pilots'
    import {generateSaaaPilotsCert} from '@templates/patient/saaa-pilots-cert'
    import {reactive, ref} from 'vue'
    import router from '@/router'
    import {
        columnWrapper,
        halfLeftColumn,
        halfRightColumn,
    } from '@/util/css-classes'

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'
    import SectionTitle from '@component/SectionTitle/SectionTitle.vue'

    const {links, userData} = globalStore()
    const store = pilotsLicenseStore()
    const {data, defaultData} = reactive({
        ...store.$state,
    })

    const {
        fullName,
        phoneNumber,
        auscultation,
        coverTest,
        audioMeterTest,
        drugTest,
    } = reactive(data)

    //region Saved Data
    const savedFullName = ref(fullName)
    const savedPhoneNumber = ref(phoneNumber)
    const savedAuscultation = ref(auscultation)
    const savedCoverTest = ref(coverTest)
    const savedAudioMeterTest = ref(audioMeterTest)
    const savedDrugTest = ref(drugTest)
    //endregion

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateSaaaPilots(pilotsLicenseStore().data, userData, links.patientFile, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const copyContentsForSaaa = () => generateSaaaPilotsCert(pilotsLicenseStore().data, userData, links.saaaCert, true)
    const reset = () => {
        store.data = defaultData
        router.go('/patient/patient-file')
    }
    //endregion
</script>

<template>
    <div class="pilots-license w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Pilot's Evaluation File"
                    body="This page is used to create a pilot's evaluation file."
                />

                <div class="pb-4">
                    <SectionTitle title="Patient Information" />
                    <div :class="columnWrapper">
                        <!-- Full Name -->
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedFullName"
                                placeholder="FName LName"
                                label="Full Name"
                                size="md"
                                @focusout="updateState('fullName', savedFullName)"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedPhoneNumber"
                                placeholder="5551234"
                                label="Phone Number"
                                size="md"
                                @focusout="updateState('phoneNumber', savedPhoneNumber)"
                            />
                        </fieldset>
                    </div>
                </div>

                <div class="pb-4">
                    <SectionTitle title="Physical Examination" />
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedAuscultation"
                            placeholder="Lungs are... Heart is..."
                            label="Auscultation"
                            size="md"
                            rows="3"
                            @focusout="updateState('auscultation', savedAuscultation)"
                        />
                    </fieldset>
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedCoverTest"
                            placeholder="Exam Results..."
                            label="Eye Exam (Cover Test) - Only if necessary"
                            size="md"
                            rows="3"
                            @focusout="updateState('coverTest', savedCoverTest)"
                        />
                    </fieldset>
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedAudioMeterTest"
                            placeholder="Hearing range was..."
                            label="Audio-Meter Test - Only if necessary"
                            size="md"
                            rows="3"
                            @focusout="updateState('audioMeterTest', savedAudioMeterTest)"
                        />
                    </fieldset>
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedDrugTest"
                            placeholder="Urinalysis results were..."
                            label="Drug Test Results ((/drugTest or Urinalysis))"
                            size="md"
                            rows="3"
                            @focusout="updateState('drugTest', savedDrugTest)"
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
                        color="green"
                        size="lg"
                        class="md:mx-4"
                        @click="copyContentsForSaaa"
                    >
                        Copy Certificate
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
