import {dateToUtc} from '@utils/mixins'

export const generateAppointmentFormat = ({reasonForVisit, dateOfAppointment, timeScheduled}, {divisionalRanks, name, rank, signature}, destination, newPage = false) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/oKrEeDx.png[/img]
[lsemssubtitle]SCHEDULING APPOINTMENT[/lsemssubtitle]
[divbox=white]
[hr]
[b]Reason for Appointment:[/b]
${reasonForVisit}
[hr]
[b]Date of Appointment:[/b] ${dateToUtc(dateOfAppointment)}
[hr]
[b]Time scheduled:[/b] ${timeScheduled}

[center][color=blue][b]

((Use UTC timezone for the appointments to keep it universal))[/b][/color][/center]
[/divbox]
[divbox=white]

[img]${signature}[/img]
[i]${name}[/i]
[b]${divisionalRanks.amu || ''} / ${rank}[/b]
Los Santos Advanced Medicine Division
[/divbox][img]https://i.imgur.com/HNP4ksW.png[/img]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )
        newPage && window.open(destination, '_blank')
    }
}
