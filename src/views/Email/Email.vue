<script setup>
    /**
     * Vue Scripts
     */
    import {reactive, ref} from 'vue'
    import router from '@/router'
    import {globalStore} from '@stores/global'
    import {emailStore} from '@stores/email'
    import {generateEmail} from '@templates/email/email'
    import {
        columnWrapper,
        halfLeftColumn,
        halfRightColumn,
    } from "@/utils/css-classes"

    /**
     * Vue Components
     */
    import {FwbButton, FwbInput, FwbTextarea} from 'flowbite-vue'
    import BodyHeader from '@component/BodyHeader/BodyHeader'
    import TextboxBar from "@component/TextboxBar/TextboxBar"

    const {links, userData} = globalStore()
    const store = emailStore()
    const {data, defaultData} = reactive({...store.$state,})

    const {subject, to, body} = reactive(data)

    const savedSubject = ref(subject)
    const savedTo = ref(to)
    const savedBody = ref(body)

    const updateState = (field, value) => (store.data[field] = value)
    const setupContents = (newPage = false) => generateEmail(emailStore().data, userData, links.email, newPage)
    const copyContents = () => setupContents()
    const copyContentsForGov = () => setupContents(true)
    const reset = () => {
        store.data = defaultData
        router.go('/email/internal-email')
    }
</script>

<template>
    <div class="email w-full overflow-hidden rounded-lg ring-1 ring-slate-900 dark:ring-slate-100">
        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-16 lg:px-8">
            <div class="mx-auto">
                <BodyHeader
                    title="Create An Email"
                    body="This page is used to create a formatted email."
                />
                <div class="pb-4">
                    <div :class=columnWrapper>
                        <!-- Subject Line -->
                        <fieldset :class=halfLeftColumn>
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
                        <fieldset :class=halfRightColumn>
                            <FwbInput
                                v-model="savedTo"
                                placeholder="John Doe"
                                label="Email To"
                                size="md"
                                @focusout="updateState('to', savedTo)"
                            />
                        </fieldset>
                    </div>
                    <!-- Body of your email -->
                    <fieldset class="my-8">
                        <FwbTextarea
                            v-model="savedBody"
                            placeholder="Body copy..."
                            label="Email Body"
                            size="lg"
                            rows="8"
                            @focusout="updateState('body', savedBody)"
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
