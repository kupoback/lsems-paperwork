import {useStorage} from '@vueuse/core'

const defaultData = {
    fullName: '',
    summary: '',
    leftStrength: '',
    rightStrength: '',
    leftCylinder: '',
    rightCylinder: '',
    leftAxis: '',
    rightAxis: '',
}

export default () => ({
    data: useStorage('eyePrescriptionData', defaultData),
    defaultData,
})
