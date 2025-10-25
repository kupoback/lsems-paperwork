import {useStorage} from '@vueuse/core'

const defaultData = {
    // General Information
    fullName: '',
    phoneNumber: '',
    // Physical Examination
    auscultation: '',
    coverTest: '',
    audioMeterTest: '',
    drugTest: '',
}

export default () => ({
    data: useStorage('pilotsLicenseData', defaultData),
    defaultData,
})
