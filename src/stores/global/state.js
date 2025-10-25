import {useStorage} from '@vueuse/core'

export default () => ({
    darkMode: useStorage('darkMode', true),
    loading: false,
    links: {
        dutyReport: 'https://gov.eclipse-rp.net/viewforum.php?f=755',
        email: 'https://gov.eclipse-rp.net/ucp.php?i=pm&folder=inbox',
        patientFile: 'https://gov.eclipse-rp.net/viewforum.php?f=1223',
        publicRequest: 'https://gov.eclipse-rp.net/viewforum.php?f=3641',
        prescription: 'https://gov.eclipse-rp.net/viewforum.php?f=2710',
        saaaCert: 'https://gov.eclipse-rp.net/viewforum.php?f=3462',
    },
    siteLogo: 'https://i.imgur.com/9uGiPqF.png',
    userData: useStorage('userdata', {
        internalRank: '',
        name: 'FirstName LastName',
        rank: 'Rank',
        signature: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
        phone: '',
    }),
})
