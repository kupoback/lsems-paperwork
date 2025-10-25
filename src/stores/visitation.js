import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/patient/visitation/state'
import visitationFieldActions from '@/stores/patient/visitation/actions'

export const visitationStore = defineStore('visitationStore', {
    state,
    actions: {
        ...globalActions,
        ...visitationFieldActions,
    },
})
