<script setup>
    import {ref} from "vue";

    const {
        buttonAction,
        buttonRemoveText,
        fieldClasses,
        fieldId,
        fieldIndex,
        fieldLabel,
        fieldPlaceholder,
        fieldType,
        fieldValue,
        focusEvent,
        hideButton,
        labelClasses,
    } = defineProps(
        {
            buttonAction: {
                type: Function,
                default: () => {}
            },
            buttonRemoveText: {
                type: String,
                default: "Remove"
            },
            fieldClasses: {
                type: String,
                default:
                    "",
            },
            fieldId: {
                type: [Number, String],
                default: "",
            },
            fieldIndex: {
                type: Number,
                default: "",
            },
            fieldLabel: {
                type: String,
                default: "",
            },
            fieldPlaceholder: {
                type: String,
                default: "",
            },
            fieldType: {
                type: String,
                default: "text",
            },
            fieldValue: {
                type: String,
                default: "",
            },
            focusEvent: {
                type: Function,
                default: () => {},
            },
            hideButton: {
                type: Boolean,
                default: false,
            },
            labelClasses: {
                type: String,
                default: '',
            }
        }
    )

    const savedValue = ref(fieldValue);
</script>

<template>
    <fieldset>
        <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            :class="labelClasses"
            :for="fieldId"
            v-html="fieldLabel"
        />
        <div class="flex relative">
            <input
                v-model="savedValue"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5 text-sm"
                :class="fieldClasses"
                :id="fieldId"
                :type="fieldType"
                :placeholder="fieldPlaceholder"
                :aria-placeholder="fieldPlaceholder"
                :value="savedValue"
                autocomplete="off"
                aria-autocomplete="off"
                @keydown.enter="focusEvent({index: fieldIndex, value: savedValue})"
                @focusout="focusEvent({index: fieldIndex, value: savedValue})"
            />
            <span v-if="hideButton"
                  class="absolute inset-y-0 right-0 grid w-10 place-content-center">
                <button type="button"
                        class="rounded-full bg-rose-600 p-0.5 text-white hover:bg-rose-700"
                        @click="spanAction"
                        @keydown.enter="spanAction">
                    <span class="sr-only" v-html="buttonRemoveText" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"/>
                    </svg>
                </button>
            </span>
        </div>
    </fieldset>
</template>

<script>
    export default {
        methods: {
            spanAction() {
                this.buttonAction(this.fieldIndex)
            }
        },
        name: "MultiInputField",
    };
</script>

<style lang="scss" scoped></style>
