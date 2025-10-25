<!-- eslint-disable prettier/prettier -->
<template>
    <div class="relative">
        <InputField
            :field-id="lineId"
            :field-label="divisionLineLabel"
            :field-placeholder="divisionLinePlaceholder"
            :fieldValue="content"
            :focusEvent="updateArray" />
        <span class="absolute inset-y-0 right-0 grid w-10 place-content-center">
            <button type="button"
                    class="rounded-full bg-rose-600 p-0.5 text-white hover:bg-rose-700"
                    @click="removeCurrentDivisionLine(lineIndex)"
                    @keydown.enter="removeCurrentDivisionLine(lineIndex)">
                <span class="sr-only">Remove Row</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                </svg>
            </button>
        </span>
    </div>
</template>

<script setup>
import { formStore } from "@/stores/personalForm";
// eslint-disable-next-line prettier/prettier
const { divisionLineLabel, divisionLinePlaceholder, removeCurrentDivisionLine, updateArray } = formStore();
</script>

<script>
import InputField from "./InputField.vue";

export default {
    props: {
        content: {
            type: String,
            default: "",
        },
        lineId: {
            type: Number,
            default: 0,
        },
        lineIndex: {
            type: Number,
            default: 0,
        },
    },
    components: { InputField },
    computed: {},
    name: "DivisionLine",
};
</script>
