import {useStorage} from '@vueuse/core'

const defaultData = {
    fullName: '',
    phoneNumber: '',
    drugsFound: '',
    prescription: 'Methadone',
    amountIssued: 10,
    educated: false,
}

export default () => ({
    data: useStorage('methadoneData', defaultData),
    defaultData,
})
