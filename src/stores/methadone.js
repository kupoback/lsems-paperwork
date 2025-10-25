import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/prescriptions/methadone/state'
import methadoneFieldActions from '@/stores/prescriptions/methadone/actions'

export const methadoneStore = defineStore('methadoneStore', {
    state,
    actions: {
        ...globalActions,
        ...methadoneFieldActions,
    },
})
