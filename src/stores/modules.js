import {defineStore} from 'pinia'

import state from '@/stores/modules/state'
import actions from '@/stores/modules/actions'
import globalActions from '@/stores/global/actions'

export const modulesStore = defineStore('modulesStore', {
    state,
    actions: {
        ...globalActions,
        ...actions,
    },
})
