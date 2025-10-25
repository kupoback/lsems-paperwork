import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/field-training/ride-along/state'
import rideAlongFormatFieldActions from '@/stores/field-training/ride-along/actions'

export const rideAlongFormatStore = defineStore('rideAlongFormatStore', {
    state,
    actions: {
        ...globalActions,
        ...rideAlongFormatFieldActions,
    },
})

