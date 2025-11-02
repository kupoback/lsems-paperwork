import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/textboxbar/store'
import textboxBarFormatFieldActions from '@/stores/textboxbar/actions'

export const textboxBarFormatStore = defineStore('textboxBarFormatStore', {
    state,
    actions: {
        ...globalActions,
        ...textboxBarFormatFieldActions,
    },
})
