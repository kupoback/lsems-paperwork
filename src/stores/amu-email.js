import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/email/amu-email/state'
import amuEmailActions from '@/stores/email/amu-email/actions'

export const amuEmailStore = defineStore('amuEmailStore', {
    state,
    actions: {
        ...globalActions,
        ...amuEmailActions,
    },
})
