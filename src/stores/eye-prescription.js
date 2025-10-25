import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/prescriptions/eye-prescription/state'
import eyePrescriptionFieldActions from '@/stores/prescriptions/eye-prescription/actions'

export const eyePrescriptionStore = defineStore('eyePrescriptionStore', {
    state,
    actions: {
        ...globalActions,
        ...eyePrescriptionFieldActions,
    },
})
