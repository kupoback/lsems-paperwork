export default {
    register(id, element) {
        this.textAreas[id] = element
    },

    unregister(id) {
        delete this.textAreas[id]
        if (this.activeId === id) this.activeId = null
    },

    setActive(id) {
        this.activeId = id
    },

    insertSpoiler() {
        const textarea = this.textAreas[this.activeId]
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const before = text.substring(0, start)
        const selected = text.substring(start, end)
        const after = text.substring(end)

        const spoiler = selected ? `[spoiler]=${selected}[/spoiler]` : `[spoiler=][/spoiler]`

        textarea.value = before + spoiler + after

        // Move cursor to end of inserted content
        const newPos = before.length + spoiler.length
        textarea.focus()
        textarea.setSelectionRange(newPos, newPos)

        // Trigger manual input event so v-model updates
        textarea.dispatchEvent(new Event('input'))
    },
}
