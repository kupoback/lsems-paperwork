<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {rideAlongFormatStore} from '@stores/ride-along'
    import {generateRideAlong} from '@templates/field-training/ride-along'
    import {reactive, ref} from 'vue'
    import router from '@/router'

    /**
     * Vue Components
     */
    import {FwbButton, FwbCheckbox, FwbInput, FwbSelect, FwbTextarea} from 'flowbite-vue'
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'

    const {links, userData} = globalStore()
    const store = rideAlongFormatStore()
    const {data, defaultData, rideAlongTypes} = reactive({
        ...store.$state,
    })

    const {rideAlongType, startTime, endTime, feedBackConcerns, departmentCalls, transportSuspect, suspectNotes, rideAlongNotes, additionalMandatoriesNeeded} = reactive(data)

    const formatter = ref({
        date: 'DD/MMM/YYYY HH:mm',
        month: 'MMM',
    })
    const savedRideAlongType = ref(rideAlongType)
    const savedStartTime = ref(startTime)
    const savedEndTime = ref(endTime)
    const savedFeedBackConcerns = ref(feedBackConcerns)
    const savedDepartmentCalls = ref(departmentCalls)
    const savedTransportSuspect = ref(transportSuspect)
    const savedSuspectNotes = ref(suspectNotes)
    const savedRideAlongNotes = ref(rideAlongNotes)
    const savedAdditionalMandatoriesNeeded = ref(additionalMandatoriesNeeded)

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateRideAlong(rideAlongFormatStore().data, userData, links.email, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/ride-along')
    }
    //endregion
</script>

<template>
    <div class="email w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <div class="max-w-2xl mx-auto text-center pb-8">
                    <h2 class="text-4xl font-bold leading-7 text-gray-900 dark:text-white pb-4">Create An EMR Ridealong</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-white"> This page is used to create a formatted email from AMU. </p>
                </div>
                <div class="pb-4">
                    <fieldset class="my-8">
                        <FwbSelect
                            v-model="savedRideAlongType"
                            :options="rideAlongTypes"
                            label="Optional?"
                            @change="updateState('rideAlongType', savedRideAlongType)"
                        />
                    </fieldset>
                    <div class="flex">
                        <!-- Ride Along Start Time -->
                        <fieldset class="my-8 mr-2 flex-auto">
                            <label
                                for="start-time"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Ride Along Start Time</label
                            >
                            <VueTailwindDatepicker
                                v-model="savedStartTime"
                                id="start-time"
                                placeholder="DD/MMM/YYYY HH:mm"
                                as-single
                                :formatter="formatter"
                                @focusout="updateState('dateOfAppointment', savedStartTime)"
                            />
                        </fieldset>
                        <!-- Ride Along End Time -->
                        <fieldset class="my-8 ml-2 flex-auto">
                            <label
                                for="end-time"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Ride Along End Time</label
                            >
                            <VueTailwindDatepicker
                                v-model="savedReasonForVisit"
                                id="end-time"
                                placeholder="DD/MMM/YYYY HH:mm"
                                as-single
                                :formatter="formatter"
                                @focusout="updateState('dateOfAppointment', savedReasonForVisit)"
                            />
                        </fieldset>
                    </div>
                    <!-- Subject Line -->
                    <fieldset class="w-6/12 pr-2">
                        <FwbInput
                            v-model="savedSubject"
                            placeholder="Subject Line"
                            label="Subject Line"
                            size="md"
                            @keydown.enter="updateState('subject', savedSubject)"
                            @focusout="updateState('subject', savedSubject)"
                        />
                    </fieldset>
                    <!-- To -->
                    <fieldset class="w-6/12 pl-2">
                        <FwbInput
                            v-model="savedTo"
                            placeholder="John Doe"
                            label="Email To"
                            size="md"
                            @focusout="updateState('to', savedTo)"
                        />
                    </fieldset>

                    <!-- Suspect Notes -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedSuspectNotes"
                            placeholder="EMR John did..."
                            label="Suspect Transport Notes"
                            size="lg"
                            rows="12"
                            @focusout="updateState('suspectNotes', savedSuspectNotes)"
                        />
                    </fieldset>
                    <!-- Ride Along Notes -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedRideAlongNotes"
                            placeholder="EMR John did..."
                            label="Ride Along Notes"
                            size="lg"
                            rows="12"
                            @focusout="updateState('rideAlongNotes', savedRideAlongNotes)"
                        />
                    </fieldset>
                    <!-- Mandatory Assignment Notes -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedAdditionalMandatoriesNeeded"
                            placeholder="EMR John needs to redo..."
                            label="Mandatory Assignment Notes"
                            size="lg"
                            rows="4"
                            @focusout="updateState('additionalMandatoriesNeeded', savedAdditionalMandatoriesNeeded)"
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
