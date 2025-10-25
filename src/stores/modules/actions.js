const defaults = {}

export default {
    defaults,
    clearInputs(elmId) {
        // Reset Input fields
        const inputFields = document.getElementById(elmId).getElementsByTagName('input')
        inputFields.length && [...inputFields].map(input => (input.value = ''))

        // Reset Textarea Fields
        const textareaFields = document.getElementById(elmId).getElementsByTagName('textarea')
        textareaFields.length && [...textareaFields].map(input => (input.value = ''))

        // Reset Select fields
        const selectFields = document.getElementById(elmId).getElementsByTagName('select')
        selectFields.length && (selectFields[0][0].selected = true)
    },
}
