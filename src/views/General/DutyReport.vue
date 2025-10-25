<script setup>
    import {globalStore} from '@stores/global'
    import {computed, reactive, ref} from 'vue'
    import router from '@/router'
    import {dutyReportStore} from '@stores/duty-report'
    import {columnWrapper, halfLeftColumn, halfRightColumn} from '@utils/css-classes'
    import {generateDutyReport} from '@templates/general/duty-report'

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'

    const {links, userData} = globalStore()
    const store = dutyReportStore()
    const {data, defaultData} = reactive({
        ...store.$state,
    })

    const {startDateTime, endDateTime, fieldTreated, hospitalized, notes} = reactive(data)

    const formatter = ref({
        date: 'DD/MMM/YYYY HH:mm',
        month: 'MMM',
    })

    //region savedData
    const savedStartDateTime = ref(startDateTime)
    const savedEndDateTime = ref(endDateTime)
    const savedFieldTreated = ref(fieldTreated)
    const savedHospitalized = ref(hospitalized)
    //endregion

    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateDutyReport(dutyReportStore().data, userData, links.dutyReport, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/general/duty-report')
    }

</script>

<template>
    <div class="appointment-format w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100 md:pb-20">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Duty Report"
                    body="This page is used to create a duty report entry."
                />
                <div class="pb-4">
                    <p
                        class="mt-1 leading-6 text-gray-600 dark:text-white"
                        v-html="`The dates and times will be converted to UTC.`"
                    />
                    <div :class="columnWrapper">
                        <!-- Start of Service -->
                        <fieldset :class="halfLeftColumn">
                            <label
                                for="dob"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Start of Service
                            </label>
                            <VueTailwindDatepicker
                                v-model="savedStartDateTime"
                                id="start-service"
                                placeholder="DD/MMM/YYYY HH:mm"
                                as-single
                                :formatter="formatter"
                                @focusout="updateState('startDateTime', savedStartDateTime)"
                            />
                        </fieldset>
                        <!-- End of Service -->
                        <fieldset :class="halfRightColumn">
                            <label
                                for="dob"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                End of Service
                            </label>
                            <VueTailwindDatepicker
                                v-model="savedEndDateTime"
                                id="end-service"
                                placeholder="DD/MMM/YYYY HH:mm"
                                as-single
                                :formatter="formatter"
                                @focusout="updateState('endDateTime', savedEndDateTime)"
                            />
                        </fieldset>
                    </div>

                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedFieldTreated"
                                placeholder="75"
                                label="Number Treated in the Field"
                                size="md"
                                type="number"
                                step="1"
                                min="0"
                                @focusout="updateState('fieldTreated', savedFieldTreated)"
                            />
                            <p
                                class="text-sm mt-1"
                                v-html="`This indicates the number of people that were treated in the field but did not require being transported to the hospital.`"
                            />
                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedHospitalized"
                                placeholder="75"
                                label="Number Transported to Hospital"
                                size="md"
                                type="number"
                                step="1"
                                min="0"
                                @focusout="updateState('hospitalized', savedHospitalized)"
                            />
                            <p
                                class="text-sm mt-1"
                                v-html="`This indicates the number of people that were transported to the hospital.`"
                            />
                        </fieldset>
                    </div>

                    <div class="my-8">

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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Duty Report',
    }
</script>

<style scoped lang="scss"></style>
