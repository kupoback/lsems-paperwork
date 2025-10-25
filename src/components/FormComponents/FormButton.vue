<script setup>
    const {buttonAction, buttonClass, buttonLabel, buttonType, fieldSetClass} = defineProps(
        {
            buttonAction: {
                type: Function,
                default: () => {},
            },
            buttonClass: {
                type: String,
                default: "",
            },
            buttonLabel: {
                type: String,
                default: "",
            },
            buttonType: {
                type: String,
                default: "button",
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            fieldSetClass: {
                type: String,
                default: "",
            },
        }
    )
</script>

<template>
    <fieldset :class="fieldSetClass">
        <button
            :class="buttonClass + (disabled ? ' disabled:opacity-10' : '')"
            :type="buttonType"
            :disabled="disabled"
            @click="buttonAction"
            @keydown.enter="buttonAction"
            v-html="buttonLabel"
        />
    </fieldset>
</template>
