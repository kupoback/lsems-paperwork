<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {eyePrescriptionStore} from '@stores/eye-prescription'
    import {generateEyePrescription} from '@templates/prescriptions/eye-prescription'
    import {reactive, ref} from 'vue'
    import router from '@/router'
    import {
        columnWrapper,
        thirdLeftColumn,
        thirdMiddleColumn,
        thirdRightColumn,
    } from '@util/css-classes'

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'
    import SectionTitle from '@component/SectionTitle/SectionTitle.vue'

    const {links, userData} = globalStore()
    const store = eyePrescriptionStore()
    const {data, defaultData} = reactive({...store.$state})

    const {
        fullName,
        summary,
        leftStrength,
        rightStrength,
        leftCylinder,
        rightCylinder,
        leftAxis,
        rightAxis,
    } = reactive(data)

    //region Saved Data
    const formatter = ref({
        date: 'DD/MMM/YYYY HH:mm',
        month: 'MMM',
    })
    const savedFullName = ref(fullName)
    const savedSummary = ref(summary)
    const savedLeftStrength = ref(leftStrength)
    const savedRightStrength = ref(rightStrength)
    const savedLeftCylinder = ref(leftCylinder)
    const savedRightCylinder = ref(rightCylinder)
    const savedLeftAxis = ref(leftAxis)
    const savedRightAxis = ref(rightAxis)
    //endregion

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateEyePrescription(eyePrescriptionStore().data, userData, links.prescription, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/prescription/eye-prescription')
    }
    //endregion
</script>

<template>
    <div class="prescription w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Eye Prescription"
                    body="This page is used to create an eye prescription."
                />
                <div class="pb-4">
                    <!-- Full Name -->
                    <fieldset class="my-8">
                        <FwbInput
                            v-model="savedFullName"
                            placeholder="FName LName"
                            label="Patients Name"
                            size="md"
                            @focusout="updateState('fullName', savedFullName)"
                        />
                    </fieldset>
                    <!-- Summary -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedSummary"
                            placeholder="Reason for the visit"
                            label="Prescription Summary"
                            size="md"
                            @focusout="updateState('summary', savedSummary)"
                        />
                    </fieldset>
                    <SectionTitle title="Left Eye" />
                    <div :class=columnWrapper>
                        <!-- Left Strength -->
                        <fieldset :class=thirdLeftColumn>
                            <FwbInput
                                v-model="savedLeftStrength"
                                placeholder="-3.50"
                                label="Left Strength"
                                size="md"
                                @focusout="updateState('leftStrength', savedLeftStrength)"
                            />
                        </fieldset>
                        <!-- Left Cylinder -->
                        <fieldset :class=thirdMiddleColumn>
                            <FwbInput
                                v-model="savedLeftCylinder"
                                placeholder="0"
                                label="Left Cylinder"
                                size="md"
                                @focusout="updateState('leftCylinder', savedLeftCylinder)"
                            />
                        </fieldset>
                        <!-- Left Axis -->
                        <fieldset :class=thirdRightColumn>
                            <FwbInput
                                v-model="savedLeftAxis"
                                placeholder="0"
                                label="Left Axis"
                                size="md"
                                @focusout="updateState('leftAxis', savedLeftAxis)"
                            />
                        </fieldset>
                    </div>
                    <SectionTitle title="Right Eye" />
                    <div :class=columnWrapper>
                        <!-- Right Strength -->
                        <fieldset :class=thirdLeftColumn>
                            <FwbInput
                                v-model="savedRightStrength"
                                placeholder="-3.50"
                                label="Left Strength"
                                size="md"
                                @focusout="updateState('rightStrength', savedRightStrength)"
                            />
                        </fieldset>
                        <!-- Right Cylinder -->
                        <fieldset :class=thirdMiddleColumn>
                            <FwbInput
                                v-model="savedRightCylinder"
                                placeholder="0"
                                label="Right Cylinder"
                                size="md"
                                @focusout="updateState('rightCylinder', savedRightCylinder)"
                            />
                        </fieldset>
                        <!-- Right Axis -->
                        <fieldset :class=thirdRightColumn>
                            <FwbInput
                                v-model="savedRightAxis"
                                placeholder="0"
                                label="Right Axis"
                                size="md"
                                @focusout="updateState('rightAxis', savedRightAxis)"
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
