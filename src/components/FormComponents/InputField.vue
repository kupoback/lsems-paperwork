<template>
    <fieldset :class="fieldSetClasses">
        <label
            class="block pb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            :class="labelClasses"
            :for="fieldId"
            v-html="fieldLabel"
        />
        <input
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5 text-sm"
            v-model="inputValue"
            :class="fieldClasses"
            :id="fieldId"
            :type="fieldType"
            :placeholder="fieldPlaceholder"
            :aria-placeholder="fieldPlaceholder"
            :value="inputValue"
            autocomplete="off"
            aria-autocomplete="off"
            @keydown.enter="focusAction()"
            @focusout="focusAction()"
        />
    </fieldset>
</template>

<script>
    export default {
        props: {
            fieldSetClasses: {
                type: String,
                default: '',
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
                default: () => {
                },
            },
            labelClasses: {
                type: String,
                default: 'mb-1 md:mb-0 pr-4',
            }
        },
        data: () => ({
            inputValue: "",
        }),
        mounted() {
            this.setValue();
        },
        updated() {
            this.setValue();
        },
        methods: {
            setValue() {
                this.fieldValue.length && (this.inputValue = this.fieldValue);
            },
            focusAction() {
                this.focusEvent({
                    index: this.fieldIndex,
                    value: this.inputValue,
                });
            },
        },
        name: "InputField",
    };
</script>

<style lang="scss" scoped></style>
