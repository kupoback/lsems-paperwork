<script setup>
    import {globalStore} from '@stores/global'
    import {computed, reactive, ref} from 'vue'

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput} from 'flowbite-vue'
    import BodyHeader from '@component/BodyHeader/BodyHeader.vue'
    import {columnWrapper, halfLeftColumn, halfRightColumn, thirdLeftColumn, thirdMiddleColumn, thirdRightColumn} from '@util/css-classes'

    let buttonText = 'Save Data'
    let savingText = 'Saving Data'

    const store = globalStore()
    const {userData, updateState} = store

    const {
        internalRank,
        name,
        rank,
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

    const savedInternalRank = ref(internalRank)
    const savedName = ref(name)
    const savedRank = ref(rank)
    const savedSignature = ref(signature)
    const savedMonday = ref(monday)
    const savedTuesday = ref(tuesday)
    const savedWednesday = ref(wednesday)
    const savedThursday = ref(thursday)
    const savedFriday = ref(friday)
    const savedSaturday = ref(saturday)
    const savedSunday = ref(sunday)
    const savedPhone = ref(phone)

    const isLoading = computed(() => globalStore().loading)

    const updateInternalRank = () => (store.userData.internalRank = savedInternalRank.value)
    const updateName = () => (store.userData.name = savedName.value)
    const updateRank = () => (store.userData.rank = savedRank.value)
    const updateSignature = () => (store.userData.signature = savedSignature.value)
    const updateMonday = () => (store.userData.monday = savedMonday.value)
    const updateTuesday = () => (store.userData.tuesday = savedTuesday.value)
    const updateWednesday = () => (store.userData.wednesday = savedWednesday.value)
    const updateThursday = () => (store.userData.thursday = savedThursday.value)
    const updateFriday = () => (store.userData.friday = savedFriday.value)
    const updateSaturday = () => (store.userData.saturday = savedSaturday.value)
    const updateSunday = () => (store.userData.sunday = savedSunday.value)
    const updatePhone = () => (store.userData.phone = savedPhone.value)


    /**
     * Just disables the save button while the store state is completed
     * @returns {Promise<void>}
     */
    const saveFields = () => {
        store.loading = true
        setTimeout(async () => {
            updateState({
                userData: {
                    internalRank: savedInternalRank.value,
                    name: savedName.value,
                    rank: savedRank.value,
                    signature: savedSignature.value,
                    monday: savedMonday.value,
                    tuesday: savedTuesday.value,
                    wednesday: savedWednesday.value,
                    thursday: savedThursday.value,
                    friday: savedFriday.value,
                    saturday: savedSaturday.value,
                    sunday: savedSunday.value,
                    phone: savedPhone.value,
                },
            })
            store.loading = false
        }, 500)
    }
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
                        <fieldset :class="thirdLeftColumn">
                            <FwbInput
                                v-model="savedName"
                                placeholder="FName LName"
                                label="Your name"
                                size="md"
                                @keydown.enter="updateName"
                                @focusout="updateName"
                            />
                        </fieldset>
                        <fieldset :class="thirdMiddleColumn">
                            <FwbInput
                                v-model="savedRank"
                                placeholder="Department Rank"
                                label="Your Rank"
                                size="md"
                                @keydown.enter="updateRank"
                                @focusout="updateRank"
                            />
                        </fieldset>
                        <fieldset :class="thirdRightColumn">
                            <FwbInput
                                v-model="savedInternalRank"
                                placeholder="Doctor"
                                label="AMU Rank"
                                size="md"
                                @keydown.enter="updateInternalRank"
                                @focusout="updateInternalRank"
                            />
                        </fieldset>
                    </div>

                    <div :class="columnWrapper">
                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedSignature"
                                label="Signature Url"
                                size="md"
                                @keydown.enter="updateSignature"
                                @focusout="updateSignature"
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
                                v-model="savedMonday"
                                placeholder="01:00 - 22:00"
                                label="Monday"
                                size="md"
                                @keydown.enter="updateMonday"
                                @focusout="updateMonday"
                            />
                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedTuesday"
                                placeholder="01:00 - 22:00"
                                label="Tuesday"
                                size="md"
                                @keydown.enter="updateTuesday"
                                @focusout="updateTuesday"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedWednesday"
                                placeholder="01:00 - 22:00"
                                label="Wednesday"
                                size="md"
                                @keydown.enter="updateWednesday"
                                @focusout="updateWednesday"
                            />

                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedThursday"
                                placeholder="01:00 - 22:00"
                                label="Thursday"
                                size="md"
                                @keydown.enter="updateThursday"
                                @focusout="updateThursday"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedFriday"
                                placeholder="01:00 - 22:00"
                                label="Friday"
                                size="md"
                                @keydown.enter="updateFriday"
                                @focusout="updateFriday"
                            />
                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedSaturday"
                                placeholder="01:00 - 22:00"
                                label="Saturday"
                                size="md"
                                @keydown.enter="updateSaturday"
                                @focusout="updateSaturday"
                            />
                        </fieldset>

                        <fieldset :class="halfLeftColumn">
                            <FwbInput
                                v-model="savedSunday"
                                placeholder="01:00 - 22:00"
                                label="Sunday"
                                size="md"
                                @keydown.enter="updateSunday"
                                @focusout="updateSunday"
                            />
                        </fieldset>

                        <fieldset :class="halfRightColumn">
                            <FwbInput
                                v-model="savedPhone"
                                placeholder="5555555"
                                label="Phone Number"
                                size="md"
                                @keydown.enter="updatePhone"
                                @focusout="updatePhone"
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
