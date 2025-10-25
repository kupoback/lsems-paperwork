import {useStorage} from '@vueuse/core'

const defaultData = {
    body: '',
    subject: '',
    to: '',
    addDate: false,
    addPhone: false,
}

export default () => ({
    data: useStorage('amuEmailData', defaultData),
    defaultData,
})
