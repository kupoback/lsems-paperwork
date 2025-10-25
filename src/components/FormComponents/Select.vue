<script setup>

    import {ref} from "vue";

    const {departments, savedDept, showCurrent, selectAction} = defineProps(
        {
            departments: {
                type: Object,
                default: {}
            },
            savedDept: {
                type: String,
                default: '',
            },
            showCurrent: {
                type: Boolean,
                default: false,
            },
            selectAction: {
                type: Function,
                default: () => {}
            }
        }
    )

    const newDept = ref((showCurrent && savedDept) || '');

</script>

<template>
    <fieldset>
        <label for="department"
               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              v-html="`Select a department`"/>
            <select v-model="newDept"
                    id="department"
                    class="w-full text-gray-900 focus:ring-primary-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 p-2.5 text-sm bg-transparent dark:bg-transparent border-b-2 border-gray-200 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer border-l-0 border-t-0 border-r-0"
                    @change="changeEvent(newDept, $event)"
            >
                <option v-for="{disabled, name, value} in departments"
                        :key="value"
                        :selected="showCurrent && savedDept === value"
                        :value="value"
                        :disabled="disabled || false"
                        v-html="name" />
            </select>
        </label>
    </fieldset>
</template>

<script>
    export default {
        methods: {
            changeEvent(dept, elm) {
                this.selectAction(dept, elm.target.selectedOptions[0].label)
            }
        },
        name: 'VueSelect',
    }
</script>

<style scoped lang="scss"></style>
