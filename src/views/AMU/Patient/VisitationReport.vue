<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {visitationStore} from '@stores/visitation'
    import {generateVisitationReport} from '@templates/patient/visitation-report'
    import {reactive, ref} from 'vue'
    import router from '@/router'

    /**
     * Vue components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'

    const {links, userData} = globalStore()
    const store = visitationStore()
    const {data, defaultData} = reactive({
        ...store.$state,
    })

    const {reasonForVisit, diagnosis, personalPresent, visitReport} = reactive(data)

    //region Saved Data
    const savedReasonForVisit = ref(reasonForVisit)
    const savedDiagnosis = ref(diagnosis)
    const savedPersonalPresent = ref(personalPresent)
    const savedVisitReport = ref(visitReport)
    //endregion

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateVisitationReport(visitationStore().data, userData, links.patientFile, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/patient/visitation-report')
    }
    //endregion
</script>

<template>
    <div class="visitation-report w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Visitation Report"
                    body="This page is used to create a visitation report."
                />
                <div class="pb-4">
                    <p class="mt-1 leading-6 text-gray-600 dark:text-white"> The dates will be converted to UTC, time will not be added. </p>
                    <!-- Date of Visit -->
                    <fieldset class="my-8">
                        <label
                            for="dob"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Date of Visit</label>
                        <VueTailwindDatepicker
                            v-model="savedDateOfVisit"
                            id="dob"
                            placeholder="DD/MMM/YYYY"
                            as-single
                            :formatter="formatter"
                            @focusout="updateState('dateOfVisit', savedDateOfVisit)"
                        />
                    </fieldset>
                    <!-- Reason for Visit -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedReasonForVisit"
                            placeholder="Patient stated that..."
                            label="Reason for the Visit"
                            size="md"
                            @focusout="updateState('reasonForVisit', savedReasonForVisit)"
                        />
                    </fieldset>
                    <!-- Diagnosis -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedDiagnosis"
                            placeholder="Patient is diagnosed with..."
                            label="Patient Diagnosis"
                            size="md"
                            @focusout="updateState('diagnosis', savedDiagnosis)"
                        />
                    </fieldset>
                    <!-- Personal Present -->
                    <fieldset class="my-8">
                        <FwbInput
                            v-model="savedPersonalPresent"
                            placeholder="Doctor Names..."
                            label="Personal Present"
                            size="md"
                            @focusout="updateState('personalPresent', savedPersonalPresent)"
                        />
                    </fieldset>
                    <!-- Visit Report Summary -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedVisitReport"
                            placeholder="Visit summary..."
                            label="Visit Report"
                            size="md"
                            @focusout="updateState('visitReport', savedVisitReport)"
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
