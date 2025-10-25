import {useStorage} from '@vueuse/core'

const defaultData = {
    rideAlongType: 'Mandatory',
    startTime: '',
    endTime: '',
    feedBackConcerns: '',
    departmentCalls: '',
    transportSuspect: '',
    suspectNotes: '',
    rideAlongNotes: '',
    additionalMandatoriesNeeded: '',
}

export default () => ({
    data: useStorage('rideAlongData', defaultData),
    defaultData,
    rideAlongTypes: [
        {
            value: 'Mandatory',
            name: 'Mandatory'
        },
        {
            value: 'Optional',
            name: 'Optional'
        }
    ],
})
