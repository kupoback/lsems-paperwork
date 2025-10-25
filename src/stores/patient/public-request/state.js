import {useStorage} from '@vueuse/core'

const defaultData = {
    fullName: '',
    contactMethod: '',
    details: '',
}

export default () => ({
    data: useStorage('publicRequestData', defaultData),
    defaultData,
})
