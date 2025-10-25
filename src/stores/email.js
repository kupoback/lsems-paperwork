import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/email/email/state'
import emailActions from '@/stores/email/email/actions'

export const emailStore = defineStore('emailStore', {
    state,
    actions: {
        ...globalActions,
        ...emailActions,
    },
})
