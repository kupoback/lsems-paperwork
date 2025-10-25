import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/patient/appointment-format/state'
import appointmentFormatFieldActions from '@/stores/patient/appointment-format/actions'

export const appointmentFormatStore = defineStore('appointmentFormatStore', {
    state,
    actions: {
        ...globalActions,
        ...appointmentFormatFieldActions,
    },
})
