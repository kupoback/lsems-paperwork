import {useStorage} from '@vueuse/core'

const defaultData = {
    reasonForVisit: '',
    diagnosis: '',
    personalPresent: '',
    visitReport: '',
}

export default () => ({
    data: useStorage('visitationData', defaultData),
    defaultData,
})
