import {useStorage} from '@vueuse/core'

const defaultData = {
    startDateTime: '',
    endDateTime: '',
    fieldTreated: 0,
    hospitalized: 0,
    notes: [],
}

export default () => ({
    data: useStorage('dutyReportData', defaultData),
    defaultData,
})
