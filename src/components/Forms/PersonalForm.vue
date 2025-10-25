<!-- eslint-disable prettier/prettier -->
<script setup>
import { mapState } from "pinia";
import { formStore } from "../../stores/paperwork";
// Methods
const { addNewDivisionLine, removeDivisionLine, updateState } = formStore();
</script>

<script>
    import InputField from "../FormComponents/InputField.vue";
    import FormButton from "../FormComponents/FormButton.vue";
    import DateRange from "../FormComponents/DateRange.vue";
    import DivisionLine from "../FormComponents/DivisionLine.vue";

    export default {
        methods: {},
        computed: {
            ...mapState(formStore, [
                "divisionLineArray",
                "name",
                "badgeNumber",
                "rank",
            ]),
        },
        components: { DivisionLine, FormButton, InputField, DateRange },
        name: "FormView",
    };
</script>

<template>
    <div class="w-full">
        <form class="px-8 pt-6 pb-8 mb-4">
            <InputField
                field-id="name"
                field-label="Name"
                field-placeholder="FirstName LastName"
                :fieldValue="name"
                :focusEvent="updateState"
            />
            <InputField
                field-id="badgeNumber"
                field-label="Badge Number"
                field-placeholder="00000"
                :fieldValue="badgeNumber"
                :focusEvent="updateState"
            />
            <DateRange
                fieldId="servingTime"
                fieldLabel="Serving Time"
                fieldClasses="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
            <DivisionLine
                v-for="({ content, line }, index) in divisionLineArray"
                :key="index"
                :content="content"
                :lineId="line"
                :lineIndex="index"
            />
            <div class="md:flex md:items-center pb-8">
                <FormButton
                    fieldSetClass=""
                    buttonClass="dark:bg-white focus:shadow-outline focus:outline-none dark:text-black font-bold py-2 px-4 rounded"
                    buttonLabel="Add Row"
                    buttonType="button"
                    :buttonAction="addNewDivisionLine"
                />
                <FormButton
                    fieldSetClass="px-8"
                    buttonClass="dark:bg-red-400 focus:shadow-outline focus:outline-none dark:text-black font-bold py-2 px-4 rounded"
                    buttonLabel="Remove Last Row"
                    buttonType="button"
                    :buttonAction="removeDivisionLine"
                />
            </div>

            <div class="md:flex md:items-center">
                <FormButton
                    fieldSetClass="md:w-2/3"
                    buttonClass="dark:bg-green-400 focus:shadow-outline focus:outline-none dark:text-black font-bold py-2 px-4 rounded"
                    buttonLabel="Submit"
                    buttonType="submit"
                />
            </div>
        </form>
    </div>
</template>
