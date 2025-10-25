import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/patient/public-request/state'
import publicRequestFieldActions from '@/stores/patient/public-request/actions'

export const publicRequestStore = defineStore('publicRequestStore', {
    state,
    actions: {
        ...globalActions,
        ...publicRequestFieldActions,
    },
})
