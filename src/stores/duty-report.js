import {defineStore} from 'pinia'

import globalActions from '@/stores/global/actions'
import state from '@/stores/general/duty-report/state'
import dutyReportActions from '@/stores/general/duty-report/actions'

export const dutyReportStore = defineStore('dutyReportStore', {
    state,
    actions: {
        ...globalActions,
        ...dutyReportActions,
    },
})
