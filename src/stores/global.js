import {defineStore} from 'pinia'

import state from './global/state'
import actions from './global/actions'

export const globalStore = defineStore('globalStore', {
    state,
    actions,
})
