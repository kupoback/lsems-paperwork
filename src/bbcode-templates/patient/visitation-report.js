import {dateTimeToUtc} from '@utils/mixins'

export const generateVisitationReport = (
    {
        reasonForVisit,
        diagnosis,
        personalPresent,
        visitReport
    }, {divisionalRanks, name, rank, signature}, destination, newPage = false) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/XDND6bf.png[/img]
[lsemssubtitle]REPORT[/lsemssubtitle]
[divbox=white]
[hr]
[b]Date of Visit:[/b] ${dateTimeToUtc()}
[hr]
[b]Reason For Visit:[/b] ${reasonForVisit}
[hr]
[b]Diagnosis made:[/b]
${diagnosis}
[hr]
[b]Personnel Present:[/b] ${personalPresent}
[hr]
[b]Visit Report:[/b]
${visitReport}
[hr]
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
