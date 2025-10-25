import {createRouter, createWebHistory} from 'vue-router'

/**
 * Lazy-loaded route components
 */
const Home = () => import('@view/Home.vue')
const Settings = () => import('@view/Settings.vue')
const NotFound = () => import('@view/NotFound.vue')

/**
 * AMU / Patient
 */
const PatientFile = () => import('@view/AMU/Patient/PatientFile.vue')
const VisitationReport = () => import('@view/AMU/Patient/VisitationReport.vue')
const AppointmentFormat = () => import('@view/AMU/Patient/AppointmentFormat.vue')
const PilotsLicense = () => import('@view/AMU/Patient/PilotsLicense.vue')
const PublicRequest = () => import('@view/AMU/Patient/PublicRequest.vue')

/**
 * Prescriptions
 */
const Prescription = () => import('@view/AMU/Prescriptions/Prescription.vue')
const Methadone = () => import('@view/Prescriptions/Methadone.vue')
const EyePrescription = () => import('@view/AMU/Prescriptions/EyePrescription.vue')

/**
 * Email
 */
const Email = () => import('@view/Email/Email.vue')
const AmuEmail = () => import('@view/Email/AmuEmail.vue')

/**
 * Field Training / General (placeholders for future use)
 */
const RideAlong = () => import('@view/FieldTraining/RideAlong.vue')
const DutyReport = () => import('@view/General/DutyReport.vue')

/**
 * Base route definitions
 */
export const routes = [
    {
        path: '/amu',
        name: 'AMU',
        lowerName: 'patient-file',
        children: [
            {path: 'patient-file', name: 'Patient File', component: PatientFile},
            {path: 'pilots-license', name: 'Pilot Examination', component: PilotsLicense},
            {path: 'appointment-format', name: 'Appointments', component: AppointmentFormat},
            {path: 'public-request', name: 'Public Request', component: PublicRequest},
            {path: 'visitation-report', name: 'Visitation Report', component: VisitationReport},
        ],
    },
    {
        path: '/bls',
        name: 'BLS',
        lowerName: 'bls',
        children: [],
    },
    {
        path: '/prescription',
        name: 'Prescriptions',
        lowerName: 'prescription',
        children: [
            {path: 'prescription', name: 'Prescription', component: Prescription},
            {path: 'methadone', name: 'Methadone', component: Methadone},
            {path: 'eye-prescription', name: 'Eye Prescription', component: EyePrescription},
        ],
    },
    {
        path: '/email',
        name: 'Email',
        lowerName: 'email',
        children: [
            {path: 'internal-email', name: 'Internal Email', component: Email},
            {path: 'amu-email', name: 'Amu Email', component: AmuEmail},
        ],
    },
    // Future routes
    // {
    //   path: '/general',
    //   name: 'General',
    //   lowerName: 'general',
    //   children: [
    //     { path: 'duty-report', name: 'Duty Report', component: DutyReport },
    //   ],
    // },
    // {
    //   path: '/field-training',
    //   name: 'Field Training',
    //   lowerName: 'field-training',
    //   children: [
    //     { path: 'ride-along', name: 'Ride Along', component: RideAlong },
    //   ],
    // },
    {path: '/settings', name: 'Settings', component: Settings},
]

/**
 * Automatically prefix child routes with parent paths
 */
function normalizeRoutes(routes, parentPath = '') {
    return routes.map(route => {
        // Avoid double slashes
        const fullPath = route.path.startsWith('/') ? route.path : `${parentPath.replace(/\/$/, '')}/${route.path}`

        const normalized = {...route, path: fullPath}

        // Recursively normalize child routes
        if (route.children && route.children.length) {
            normalized.children = normalizeRoutes(route.children, fullPath)
        }

        return normalized
    })
}

// Apply normalization before creating router
const normalizedRoutes = normalizeRoutes(routes)

/**
 * Router instance
 */
const router = createRouter({
    history: createWebHistory(),
    routes: [...normalizedRoutes, {path: '/', name: 'Home', component: Home}, {path: '/:catchAll(.*)', name: 'NotFound', component: NotFound}],
    scrollBehavior() {
        return {top: 0}
    },
})

export default router
