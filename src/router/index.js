import {createRouter, createWebHistory} from 'vue-router'

/**
 * Global Components
 */
import Home from '@view/Home'
import Settings from '@view/Settings'
import NotFound from '@view/NotFound'

/**
 * Patient Components
 */
import PatientFile from '@view/AMU/Patient/PatientFile'
import VisitationReport from '@view/AMU/Patient/VisitationReport'
import AppointmentFormat from '@view/AMU/Patient/AppointmentFormat'
import PilotsLicense from '@view/AMU/Patient/PilotsLicense'
import PublicRequest from '@view/AMU/Patient/PublicRequest'

/**
 * Prescriptions
 */
import Prescription from '@view/AMU/Prescriptions/Prescription'
import Methadone from '@view/Prescriptions/Methadone'
import EyePrescription from '@view/AMU/Prescriptions/EyePrescription'

/**
 * Email Components
 */
import Email from '@view/Email/Email'
import AmuEmail from '@view/Email/AmuEmail'

/**
 * Field Training Components
 */
import RideAlong from '@view/FieldTraining/RideAlong'

/**
 * General Components
 */
import DutyReport from "@view/General/DutyReport";

export const routes = [
    {
        path: '/amu/patient',
        name: 'AMU',
        lowerName: 'patient-file',
        children: [
            {
                path: '/amu/patient/patient-file',
                name: 'Patient File',
                component: PatientFile,
            },
            {
                path: '/amu/patient/pilots-license',
                name: 'Pilot Examination',
                component: PilotsLicense,
            },
            {
                path: '/amu/patient/appointment-format',
                name: 'Appointments',
                component: AppointmentFormat,
            },
            {
                path: '/amu/patient/public-request',
                name: 'Public Request',
                component: PublicRequest,
            },
            {
                path: '/amu/patient/visitation-report',
                name: 'Visitation Report',
                component: VisitationReport,
            },
        ],
    },
    {
        path: '/bls',
        name: "BLS",
        lowerName: "bls",
        children: [
            
        ]
    },
    {
        path: '/prescription',
        name: 'Prescriptions',
        lowerName: 'prescription',
        children: [
            {
                path: '/amu/prescription/prescription',
                name: 'Prescription',
                component: Prescription,
            },
            {
                path: '/prescription/methadone',
                name: 'Methadone',
                component: Methadone,
            },
            {
                path: '/amu/prescription/eye-prescription',
                name: 'Eye Prescription',
                component: EyePrescription,
            },
        ],
    },
    {
        path: '/email',
        name: 'Email',
        lowerName: 'email',
        children: [
            {
                path: '/email/internal-email',
                name: 'Internal Email',
                component: Email,
            },
            {
                path: '/email/amu-email',
                name: 'Amu Email',
                component: AmuEmail,
            },
        ],
    },
//    {
//        path: '/general',
//        name: 'General',
//        lowerName: 'general',
//        children: [
//            {
//                path: '/general/duty-report',
//                name: 'Duty Report',
//                component: DutyReport,
//            },
//        ],
//    },
    // {
    //     path: '/field-training',
    //     name: 'Field Trianing',
    //     lowerName: 'field-training',
    //     children: [
    //         {
    //             path: '/ride-along',
    //             name: 'Ride Along',
    //             component: RideAlong,
    //         },
    //     ],
    // },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      component: NotFound,
    },
  ],
})

export default router
