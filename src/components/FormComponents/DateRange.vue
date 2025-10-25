<template>
    <fieldset class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
            <label
                class="font-bold md:text-right mb-1 md:mb-0 pr-4"
                :for="fieldId"
                v-html="fieldLabel"
            />
        </div>
        <div class="md:w-2/3">
            <VueTailwindDatePicker
                v-model="dateValue"
                overlay
                as-single
                :formatter="dateFormatter"
                :input-classes="fieldClasses"
                @update:modelValue="onSelectedDate($event)"
            />
        </div>
    </fieldset>
</template>

<script setup>
import { ref } from "vue";
import { formStore } from "@/stores/personalForm";
// Methods
const { updateState } = formStore();

const dateValue = ref(formStore()?.servingTime || "");
const dateFormatter = ref({
    date: "DD/MMM/YYYY",
    month: "MMM",
});

const onSelectedDate = (newDate) =>
    updateState({ field: "servingTime", value: newDate });
</script>

<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";

export default {
    props: {
        fieldClasses: {
            type: String,
            default:
                "appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
        },
        fieldId: {
            type: String,
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
    },
    components: { VueTailwindDatePicker },
    name: "InputField",
};
</script>

<style lang="scss" scoped></style>
