<script setup>
import {globalStore} from '@stores/global'
import {computed, reactive, ref} from 'vue'

/**
 * Vue Components
 */
import {FwbButton, FwbInput} from 'flowbite-vue'
import BodyHeader from '@component/BodyHeader/BodyHeader.vue'
import {
    columnWrapper, halfLeftColumn, halfRightColumn, thirdLeftColumn, thirdMiddleColumn, thirdRightColumn
} from '@utils/css-classes'

let buttonText = 'Save Data'
let savingText = 'Saving Data'

const store = globalStore()
const {userData, updateState} = store

const {
    name,
    rank,
    divisionalRanks,
    signature,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    phone,
} = reactive(userData)

const {
    amu,
    ar,
    bls,
    cru,
    forensics,
    fr,
    ftd,
    mr,
    pr,
    red,
} = reactive(divisionalRanks)

const savedSignature = computed(() => store.userData.signature)
const isLoading = computed(() => globalStore().loading)

/**
 * Just disables the save button while the store state is completed
 * @returns {Promise<void>}
 */
const saveFields = () => {
    //        store.loading = true
    //        setTimeout(async () => {
    //            updateState({
    //                userData: {
    //                    internalRank: savedInternalRank.value,
    //                    name: savedName.value,
    //                    rank: savedRank.value,
    //                    signature: savedSignature.value,
    //                    monday: savedMonday.value,
    //                    tuesday: savedTuesday.value,
    //                    wednesday: savedWednesday.value,
    //                    thursday: savedThursday.value,
    //                    friday: savedFriday.value,
    //                    saturday: savedSaturday.value,
    //                    sunday: savedSunday.value,
    //                    phone: savedPhone.value,
    //                },
    //            })
    //            store.loading = false
    //        }, 500)
}

const updateDataState = (value, index) => store.$patch(() => store.userData[index] = value)
const updateRankState = (value, index) => store.$patch(() => store.userData.divisionalRanks[index] = value)

</script>

<template>
    <div class="page-settings w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-8xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto max-w-8xl">
                <BodyHeader
                    title="Profile Settings"
                    body="This information will be stored to your browsers localStorage. If you clear that, you'll lose your data."
                />
                <div class="mx-auto max-w-3xl">
                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="name"
                                placeholder="FName LName"
                                label="Your name"
                                size="md"
                                @keydown.enter="updateDataState(name, 'name')"
                                @focusout="updateDataState(name, 'name')"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="rank"
                                placeholder="Department Rank"
                                label="Your Rank"
                                size="md"
                                @keydown.enter="updateDataState(rank, 'rank')"
                                @focusout="updateDataState(rank, 'rank')"
                            />
                        </fieldset>
                    </div>

                    <div :class="columnWrapper">
                        <h3 class="mb-4 w-full">Divisional Ranks</h3>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="amu"
                                placeholder="Doctor"
                                label="Advanced Medical Unit"
                                size="md"
                                @keydown.enter="updateRankState(amu, 'amu')"
                                @focusout="updateRankState(amu, 'amu')"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="ar"
                                placeholder="Pilot"
                                label="Air & Rescue"
                                size="md"
                                @keydown.enter="updateRankState(ar, 'ar')"
                                @focusout="updateRankState(ar, 'ar')"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="bls"
                                placeholder="Basic Life Support Trainees"
                                label="BLS"
                                size="md"
                                @keydown.enter="updateRankState(bls, 'bls')"
                                @focusout="updateRankState(bls, 'bls')"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="cru"
                                placeholder="First Responder"
                                label="Crisis Response Unit"
                                size="md"
                                @keydown.enter="updateRankState(cru, 'cru')"
                                @focusout="updateRankState(cru, 'cru')"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="forensics"
                                placeholder="Serologists"
                                label="Forensics"
                                size="md"
                                @keydown.enter="updateRankState(forensics, 'forensics')"
                                @focusout="updateRankState(forensics, 'forensics')"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="fr"
                                placeholder="Firefighters"
                                label="Fire & Rescue"
                                size="md"
                                @keydown.enter="updateRankState(fr, 'fr')"
                                @focusout="updateRankState(fr, 'fr')"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="ftd"
                                placeholder="Field Training Officer"
                                label="Field Training"
                                size="md"
                                @keydown.enter="updateRankState(ftd, 'ftd')"
                                @focusout="updateRankState(ftd, 'ftd')"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="mr"
                                placeholder="Mountain Rescue Operators"
                                label="Mountain Rescue"
                                size="md"
                                @keydown.enter="updateRankState(mr, 'mr')"
                                @focusout="updateRankState(mr, 'mr')"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="pr"
                                placeholder="Public Relations Representative"
                                label="Public Relations"
                                size="md"
                                @keydown.enter="updateRankState(pr, 'pr')"
                                @focusout="updateRankState(pr, 'pr')"
                            />
                        </fieldset>
                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="red"
                                placeholder="Application Handler"
                                label="Recruitment and Employment"
                                size="md"
                                @keydown.enter="updateRankState(red, 'red')"
                                @focusout="updateRankState(red, 'red')"
                            />
                        </fieldset>

                    </div>

                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="signature"
                                label="Signature Url"
                                size="md"
                                @keydown.enter="updateDataState(signature, 'signature')"
                                @focusout="updateDataState(signature, 'signature')"
                            />
                        </fieldset>
                        <fieldset
                            v-if="savedSignature"
                            :class="halfRightColumn"
                        >
                            <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your saved signature</p>
                            <div class="bg-white w-full p-4">
                                <img
                                    class="mx-auto"
                                    :src="savedSignature"
                                    alt="Signature Image"
                                />
                            </div>
                        </fieldset>
                    </div>

                    <div :class="columnWrapper">
                        <h3 class="mb-4 w-full">Leave empty for no availability</h3>
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="monday"
                                placeholder="01:00 - 22:00"
                                label="Monday"
                                size="md"
                                @keydown.enter="updateDataState(monday, 'monday')"
                                @focusout="updateDataState(monday, 'monday')"
                            />
                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="tuesday"
                                placeholder="01:00 - 22:00"
                                label="Tuesday"
                                size="md"
                                @keydown.enter="updateDataState(tuesday, 'tuesday')"
                                @focusout="updateDataState(tuesday, 'tuesday')"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="wednesday"
                                placeholder="01:00 - 22:00"
                                label="Wednesday"
                                size="md"
                                @keydown.enter="updateDataState(wednesday, 'wednesday')"
                                @focusout="updateDataState(wednesday, 'wednesday')"
                            />

                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="thursday"
                                placeholder="01:00 - 22:00"
                                label="Thursday"
                                size="md"
                                @keydown.enter="updateDataState(thursday, 'thursday')"
                                @focusout="updateDataState(thursday, 'thursday')"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="friday"
                                placeholder="01:00 - 22:00"
                                label="Friday"
                                size="md"
                                @keydown.enter="updateDataState(friday, 'friday')"
                                @focusout="updateDataState(friday, 'friday')"
                            />
                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="saturday"
                                placeholder="01:00 - 22:00"
                                label="Saturday"
                                size="md"
                                @keydown.enter="updateDataState(saturday, 'saturday')"
                                @focusout="updateDataState(saturday, 'saturday')"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="sunday"
                                placeholder="01:00 - 22:00"
                                label="Sunday"
                                size="md"
                                @keydown.enter="updateDataState(sunday, 'sunday')"
                                @focusout="updateDataState(sunday, 'sunday')"
                            />
                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="phone"
                                placeholder="5555555"
                                label="Phone Number"
                                size="md"
                                @keydown.enter="updateDataState(phone, 'phone')"
                                @focusout="updateDataState(phone, 'phone')"
                            />
                        </fieldset>
                    </div>
                </div>


                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <fieldset class="my-8">
                        <fwb-button
                            v-if="isLoading"
                            disabled
                            color="alternative"
                            size="lg"
                        >
                            {{ savingText }}
                        </fwb-button>
                        <fwb-button
                            v-else
                            size="lg"
                            @click="saveFields"
                        >
                            {{ buttonText }}
                        </fwb-button>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
