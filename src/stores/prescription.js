import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/prescriptions/prescription/state'
import prescriptionFieldActions from '@/stores/prescriptions/prescription/actions'

export const prescriptionStore = defineStore('prescriptionStore', {
    state,
    actions: {
        ...globalActions,
        ...prescriptionFieldActions,
    },
})
