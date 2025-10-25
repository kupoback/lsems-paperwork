import {useStorage} from '@vueuse/core'

const defaultData = {
    fullName: '',
    phoneNumber: '',
    diagnosis: '',
    prescription: '',
    startDate: '',
    endDate: '',
}

export default () => ({
    data: useStorage('prescriptionData', defaultData),
    defaultData,
})
