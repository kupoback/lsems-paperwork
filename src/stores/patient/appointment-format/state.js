import {useStorage} from '@vueuse/core'

const defaultData = {
    reasonForVisit: '',
    dateOfAppointment: '',
    timeScheduled: '',
}

export default () => ({
    data: useStorage('appointmentFormatData', defaultData),
    defaultData,
})
