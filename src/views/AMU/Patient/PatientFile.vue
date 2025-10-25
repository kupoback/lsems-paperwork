<script setup>
    /**
     * Vue Scripts
     */
    import {globalStore} from '@stores/global'
    import {patientFileStore} from '@stores/patient-file'
    import {generatePatientFile} from '@templates/patient/patient-file'
    import {convertHeightToCm, convertWeightToKg} from '@util/mixins'
    import {reactive, ref} from 'vue'
    import router from '@/router'
    import {columnWrapper, halfLeftColumn, halfRightColumn} from '@util/css-classes'

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'
    import SectionTitle from '@component/SectionTitle/SectionTitle.vue'

    const conversionHelperText = 'If an imperial value is entered, this will be converted to metric.'
    const conversionHeightHelper = `Example: 6'3"`

    const {links, userData} = globalStore()
    const store = patientFileStore()
    const {data, defaultData} = reactive({
        ...store.$state,
    })

    const {
        fullName,
        dateOfBirth,
        placeOfBirth,
        address,
        phoneNumber,
        profession,
        height,
        weight,
        bloodType,
        allergies,
        generalScreening,
        ecgBand,
        oximetry,
        temperature,
        bloodPressure,
        auscultation,
        coverTest,
        refractionTest,
        audioMeterTest,
        additionalNotes,
        completeBloodCount,
        xRay,
        ecg,
        urinalysis,
    } = reactive(data)

    //region Saved Data
    const formatter = ref({
        date: 'DD/MMM/YYYY',
        month: 'MMM',
    })
    const savedFullName = ref(fullName)
    const savedDateOfBirth = ref(dateOfBirth)
    const savedPlaceOfBirth = ref(placeOfBirth)
    const savedAddress = ref(address)
    const savedPhoneNumber = ref(phoneNumber)
    const savedProfession = ref(profession)
    const savedHeight = ref(height)
    const savedWeight = ref(weight)
    const savedBloodType = ref(bloodType)
    const savedAllergies = ref(allergies)
    const savedGeneralScreening = ref(generalScreening)
    const savedEcgBand = ref(ecgBand)
    const savedOximetry = ref(oximetry)
    const savedTemperature = ref(temperature)
    const savedBloodPressure = ref(bloodPressure)
    const savedAuscultation = ref(auscultation)
    const savedCoverTest = ref(coverTest)
    const savedRefractionTest = ref(refractionTest)
    const savedAudioMeterTest = ref(audioMeterTest)
    const savedAdditionalNotes = ref(additionalNotes)
    const savedCompleteBloodCount = ref(completeBloodCount)
    const savedXRay = ref(xRay)
    const savedEcg = ref(ecg)
    const savedUrinalysis = ref(urinalysis)
    //endregion

    //region Actions
    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generatePatientFile(patientFileStore().data, userData, links.patientFile, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/patient/patient-file')
    }
    //endregion
</script>

<template>
    <div class="patient-file w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create Patient File"
                    body="This page is used to create a patient file. All values will be given their appropriate suffix where applicable. The <b>BMI</b> will be auto-calculated. Do not add any metric types to fields like cm, kg, or mmHg."
                />
                <div class="pb-4">
                    <SectionTitle title="General Information" />
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
                        <!-- Date of Birth -->
                        <fieldset :class="halfRightColumn">
                            <label
                                for="dob"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Date of Birth</label
                            >
                            <VueTailwindDatepicker
                                v-model="savedDateOfBirth"
                                id="dob"
                                placeholder="DD/MMM/YYYY"
                                as-single
                                :formatter="formatter"
                                @focusout="updateState('dateOfBirth', savedDateOfBirth)"
                            />
                        </fieldset>
                    </div>
                    <div :class="columnWrapper">
                        <!-- Place of Birth -->
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedPlaceOfBirth"
                                placeholder="Place of Birth"
                                label="Place of Birth"
                                size="md"
                                @focusout="updateState('placeOfBirth', savedPlaceOfBirth)"
                            />
                        </fieldset>
                        <!-- Address -->
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedAddress"
                                placeholder="Address"
                                label="Address"
                                size="md"
                                @focusout="updateState('address', savedAddress)"
                            />
                        </fieldset>
                    </div>
                    <div :class="columnWrapper">
                        <!-- Phone Number -->
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedPhoneNumber"
                                placeholder="5551234"
                                label="Phone Number"
                                size="md"
                                @focusout="updateState('phoneNumber', savedPhoneNumber)"
                            />
                        </fieldset>
                        <!-- Profession -->
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedProfession"
                                placeholder="EMT"
                                label="Profession"
                                size="md"
                                @focusout="updateState('profession', savedProfession)"
                            />
                        </fieldset>
                    </div>
                    <div :class="columnWrapper">
                        <!-- Height -->
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedHeight"
                                placeholder="150"
                                label="Height"
                                size="md"
                                @focusout="updateState('height', convertHeightToCm(savedHeight))"
                            />
                            <p
                                class="text-sm mt-1"
                                v-html="`${conversionHelperText} Do not use ft or in. ${conversionHeightHelper}`"
                            />
                        </fieldset>
                        <!-- Weight -->
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedWeight"
                                placeholder="75"
                                label="Weight"
                                size="md"
                                @focusout="updateState('weight', convertWeightToKg(savedWeight))"
                            />
                            <p
                                class="text-sm mt-1"
                                v-html="`${conversionHelperText} Use lbs or pounds for Imperial with a space.`"
                            />
                        </fieldset>
                    </div>
                    <div :class="columnWrapper">
                        <!-- Blood Type -->
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedBloodType"
                                placeholder="AB-"
                                label="Blood Type"
                                size="md"
                                @focusout="updateState('bloodType', savedBloodType)"
                            />
                        </fieldset>
                        <!-- Allergies -->
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedAllergies"
                                placeholder="List of allergies..."
                                label="Allergies"
                                size="md"
                                @focusout="updateState('allergies', savedAllergies)"
                            />
                        </fieldset>
                    </div>
                </div>

                <div class="pb-4">
                    <SectionTitle title="Regular Examination" />
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedGeneralScreening"
                            placeholder="Enter general screening..."
                            label="General Screening"
                            size="md"
                            @focusout="updateState('narrative', savedGeneralScreening)"
                        />
                    </fieldset>
                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedEcgBand"
                                placeholder="55"
                                min="0"
                                step="1"
                                type="number"
                                label="ECG Band"
                                size="md"
                                @focusout="updateState('ecgBand', savedEcgBand)"
                            />
                            <p class="text-sm mt-1">"BMP" will be suffixed when the data is copied.</p>
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedOximetry"
                                placeholder="98"
                                label="Oximetry"
                                size="md"
                                @focusout="updateState('oximetry', savedOximetry)"
                            />
                        </fieldset>
                    </div>
                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedTemperature"
                                placeholder="37"
                                label="Temperature"
                                type="number"
                                min="0"
                                step="1"
                                size="md"
                                @focusout="updateState('temperature', savedTemperature)"
                            />
                            <p
                                class="text-sm mt-1"
                                v-html="conversionHelperText"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedBloodPressure"
                                placeholder="120/80"
                                label="Blood Pressure"
                                size="md"
                                @focusout="updateState('bloodPressure', savedBloodPressure)"
                            />
                            <p class="text-sm mt-1">"mmHg" will be suffixed when the data is copied.</p>
                        </fieldset>
                    </div>
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedAuscultation"
                            placeholder="Auscultation notes"
                            label="Auscultation"
                            size="md"
                            rows="4"
                            @focusout="updateState('auscultation', savedAuscultation)"
                        />
                    </fieldset>
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedCoverTest"
                            placeholder="Exam Results..."
                            label="Eye Exam (Cover Test)"
                            size="md"
                            rows="3"
                            @focusout="updateState('coverTest', savedCoverTest)"
                        />
                    </fieldset>
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedRefractionTest"
                            placeholder="Refraction results..."
                            label="Refraction Test"
                            size="md"
                            rows="3"
                            @focusout="updateState('refractionTest', savedRefractionTest)"
                        />
                    </fieldset>
                    <fieldset class="my-8">
                        <FwbInput
                            v-model="savedAudioMeterTest"
                            placeholder="Hearing range was..."
                            label="Audio-Meter Test"
                            size="md"
                            rows="3"
                            @focusout="updateState('audioMeterTest', savedAudioMeterTest)"
                        />
                    </fieldset>
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedAdditionalNotes"
                            placeholder="Additional information"
                            label="Additional Notes"
                            size="md"
                            rows="3"
                            @focusout="updateState('additionalNotes', savedAdditionalNotes)"
                        />
                    </fieldset>
                </div>

                <div class="pb-4">
                    <SectionTitle title="Pre-Operative Tests" />
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedCompleteBloodCount"
                            placeholder="Test results indicate..."
                            label="Complete Blood Count"
                            size="md"
                            @focusout="updateState('completeBloodCount', savedCompleteBloodCount)"
                        />
                    </fieldset>

                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedXRay"
                            placeholder="Test results indicate..."
                            label="X-Ray Test"
                            size="md"
                            @focusout="updateState('xRay', savedXRay)"
                        />
                    </fieldset>

                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedEcg"
                            placeholder="Test results indicate..."
                            label="ECG Test"
                            size="md"
                            @focusout="updateState('ecg', savedEcg)"
                        />
                    </fieldset>

                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedUrinalysis"
                            placeholder="Urinalysis test results indicate..."
                            label="Urinalysis Test"
                            size="md"
                            @focusout="updateState('urinalysis', savedUrinalysis)"
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
