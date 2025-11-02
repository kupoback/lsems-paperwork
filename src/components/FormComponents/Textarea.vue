<script setup>
    import {ref, onMounted, onBeforeUnmount} from 'vue'
    import {textboxBarFormatStore} from '@/stores/textboxbar'
    import {FwbTextarea} from 'flowbite-vue'

    const props = defineProps({
        id: {type: String, required: true},
        modelValue: String,
    })
    const emit = defineEmits(['update:modelValue'])

    const textAreaRef = ref(null)
    const editor = textboxBarFormatStore()

    onMounted(() => {
        editor.register(props.id, textAreaRef.value)
    })

    onBeforeUnmount(() => {
        editor.unregister(props.id)
    })
</script>

<template>
    <FwbTextarea
        :value="modelValue"
        placeholder="Body copy..."
        label="Email Body"
        size="lg"
        rows="8"
        @focus="editor.setActive(props.id)"
        @input="emit('update:modelValue', $event.target.value)"
    />
</template>
