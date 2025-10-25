<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {appointmentFormatStore} from '@stores/appointment-format'
    import {reactive, ref} from 'vue'
    import router from '@/router'
    import {
        columnWrapper,
        halfLeftColumn,
        halfRightColumn,
    } from "@/utils/css-classes"

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'
    import BodyHeader from '@component/BodyHeader/BodyHeader'
    import {generateAppointmentFormat} from '@templates/patient/appointment-format'

    const {links, userData} = globalStore()
    const store = appointmentFormatStore()
    const {data, defaultData} = reactive({
        ...store.$state,
    })

    const {reasonForVisit, dateOfAppointment, timeScheduled} = reactive(data)

    const formatter = ref({
        date: 'DD/MMM/YYYY HH:mm',
        month: 'MMM',
    })

    //region savedData
    const savedReasonForVisit = ref(reasonForVisit)
    const savedDateOfAppointment = ref(dateOfAppointment)
    const savedTimeScheduled = ref(timeScheduled)
    //endregion

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateAppointmentFormat(appointmentFormatStore().data, userData, links.patientFile, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/amu/patient/appointment-format')
    }
    //endregion
</script>

<template>
    <div class="appointment-format w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100 md:pb-20">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Appointment Format"
                    body="This page is used to create an appointment format."
                />
                <div class="pb-4">
                    <p class="mt-1 leading-6 text-gray-600 dark:text-white"> The dates will be converted to UTC. Time is used to convert to UTC and will not be included in the copy. </p>
                    <div :class=columnWrapper>
                        <!-- Date of Appointment -->
                        <fieldset :class=halfLeftColumn>
                            <label
                                for="dob"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Date of Appointment</label
                            >
                            <VueTailwindDatepicker
                                v-model="savedDateOfAppointment"
                                id="dob"
                                placeholder="DD/MMM/YYYY"
                                as-single
                                :formatter="formatter"
                                @focusout="updateState('dateOfAppointment', savedDateOfAppointment)"
                            />
                        </fieldset>
                        <!-- Time Scheduled -->
                        <fieldset :class=halfRightColumn>
                            <FwbInput
                                v-model="savedTimeScheduled"
                                placeholder="20:00"
                                label="Time Scheduled"
                                size="md"
                                max="4"
                                @focusout="updateState('timeScheduled', savedTimeScheduled)"
                            />
                            <p
                                class="text-sm mt-1"
                            >
                                Convert this to UTC. You can use <a href="https://www.utctime.net/" class="underline text-red-500 dark:text-red-200">UTC Time</a> to help.
                            </p>
                        </fieldset>
                    </div>
                    <!-- Reason for the Visit -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedReasonForVisit"
                            placeholder="Patient stated that..."
                            label="Reason for the Visit"
                            size="md"
                            @focusout="updateState('reasonForVisit', savedReasonForVisit)"
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

<style scoped lang="scss"></style>
