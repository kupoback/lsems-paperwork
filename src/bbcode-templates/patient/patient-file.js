import {calculateBmi, formatTemperature} from '@utils/mixins'

export const generatePatientFile = (
    {
        fullName,
        dateOfBirth,
        placeOfBirth,
        address,
        phoneNumber,
        profession,
        height,
        weight,
        bloodType,
        allergies,
        generalScreening,
        ecgBand,
        oximetry,
        temperature,
        bloodPressure,
        auscultation,
        coverTest,
        refractionTest,
        audioMeterTest,
        additionalNotes,
        completeBloodCount,
        xRay,
        ecg,
        urinalysis,
    },
    {
        divisionalRanks,
        name,
        rank,
        signature
    },
    destination,
    newPage = false,
) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/vdLuCPo.png[/img]
[lsemssubtitle]GENERAL INFORMATION[/lsemssubtitle]
[divbox=white]
[b]Full name:[/b] ${fullName}
[hr]
[b]Date of birth:[/b] ${dateOfBirth.toUpperCase()}
[hr]
[b]Place of birth:[/b] ${placeOfBirth}
[hr]
[b]Address:[/b] ${address}
[hr]
[b]Phone number:[/b] ${phoneNumber}
[hr]
[b]Profession:[/b] ${profession}
[hr]
[b]Height:[/b] ${height && `${height}cm`}
[hr]
[b]Weight:[/b] ${weight && `${weight}kg`}
[hr]
[b]Blood Type:[/b] ${bloodType}
[hr]
[b]Allergies:[/b] ${allergies}
[hr]
[/divbox]
[lsemssubtitle]REGULAR EXAMINATIONS[/lsemssubtitle]
[divbox=white]
[b]General Screening:[/b]
${generalScreening}
[hr]
[b]ECG Band:[/b] ${ecgBand && `${ecgBand} BPM`}
[hr]
[b]Oximeter:[/b] ${oximetry && `${oximetry}%`}
[hr]
[b]Temperature:[/b] ${temperature && `${formatTemperature(temperature)}C`}
[hr]
[b]Blood Pressure:[/b] ${bloodPressure && `${bloodPressure} mmHg`}
[hr]
[b]Auscultation:[/b]
${auscultation}
[hr]
[b]BMI:[/b] ${(height && weight && calculateBmi(height, weight)) || ''}
[hr]
[b]Cover Test:[/b]
${coverTest}
[hr]
[b]Refraction Test:[/b]
${refractionTest}
[hr]
[b]Audio-meter Test:[/b]
${audioMeterTest}
[hr]
[b]Additional Notes:[/b]
${additionalNotes}
[hr]
[/divbox]
[lsemssubtitle]PRE-OPERATIVE TESTS[/lsemssubtitle]
[divbox=white]
[b]Complete Blood Count:[/b]
${completeBloodCount}
[hr]
[b]X-ray:[/b]
${xRay}
[hr]
[b]ECG:[/b]
${ecg}
[hr]
[b]Urinalysis:[/b]
${urinalysis}
[hr]
[/divbox]
[divbox=white]

[img]${signature}[/img]
[i]${name}[/i]
[b]${divisionalRanks.amu || ''} / ${rank}[/b]
[b]Los Santos Emergency Medical Services[/b]
[/divbox][img]https://i.imgur.com/HNP4ksW.png[/img]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )
        newPage && window.open(destination, '_blank')
    }
}
