<template>
    <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
        <ModalContents
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            confirmationButton
            :confirmationButtonOptions="buttonOptions"
            :confirmationButtonAction="formStore().toggleDivisionPopup(false)"
        />
    </div>
</template>
<script setup>
// import { mapActions } from "pinia";
import { formStore } from "@/stores/personalForm";
// const { toggleDivisionPopup } = formStore();
</script>

<script>
import ModalContents from "./ModalContents.vue";
export default {
    data: () => ({
        buttonOptions: {
            class: "dark:bg-green-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded dark:text-white",
            label: "Okay",
        },
    }),
    methods: {
        // ...mapActions(formStore, ['toggleDivisionPopup'])
    },
    components: { ModalContents },
    name: "DivisionalModalPopup",
};
</script>
