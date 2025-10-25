<template>
    <div
        class="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
        role="alert"
    >
        <p class="mt-4 text-gray-500" v-html="content" />

        <div class="mt-6 sm:flex sm:gap-4">
            <button
                v-if="confirmationButton"
                :class="confirmationButtonOptions.class"
                :type="confirmationButtonOptions.type"
                @click="confirmationButtonAction"
                @keydown.enter="confirmationButtonAction"
                v-html="confirmationButtonOptions.label"
            />
            <button
                v-if="denyButton"
                :class="denyButtonOptions.class"
                :type="denyButtonOptions.type"
                @click="denyButtonAction"
                @keydown.enter="denyButtonAction"
                v-html="denyButtonOptions.label"
            />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            confirmationButton: {
                type: Boolean,
                default: false,
            },
            confirmationButtonAction: {
                type: Function,
                default: () => {},
            },
            confirmationButtonOptions: {
                type: Object,
                default: () => ({
                    class: "",
                    type: "button",
                    label: "",
                }),
            },
            content: {
                type: String,
                default: "",
            },
            denyButton: {
                type: Boolean,
                default: false,
            },
            denyButtonAction: {
                type: Function,
                default: () => {},
            },
            denyButtonOptions: {
                type: Object,
                default: () => ({
                    class: "",
                    type: "button",
                    label: "",
                }),
            },
        },
        data: () => ({
            defaultConfirmOptions: {
                class: "",
                type: "button",
                label: "",
            },
            defaultDenyOptions: {
                class: "",
                type: "button",
                label: "",
            },
            mergedConfirmOptions: {},
            mergedDenyOptions: {},
        }),
        mounted() {
            Object.assign(
                this.mergedConfirmOptions,
                this.defaultConfirmOptions,
                this.confirmationButtonOptions
            );
            Object.assign(
                this.mergedDenyOptions,
                this.defaultDenyOptions,
                this.denyButtonOptions
            );
        },
        name: "ModalContents",
    };
</script>
