import {dateTimeToUtc} from "@utils/mixins";

export const generateDutyReport = (
    {
        startDateTime,
        endDateTime,
        fieldTreated,
        hospitalized,
        notes,
    },
    {name, rank, signature},
    destination,
    newPage = false,
) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/fV26BWG.png[/img]
[img]https://i.imgur.com/NrEHG5w.png[/img]
[divbox=white]
[b]Date:[/b] 01/JAN/2020
[b]Hours on Duty:[/b] HH:MM
[b]Start of Service:[/b] ${dateTimeToUtc(startDateTime)} [ooc]UTC[/ooc]
[b]End of Service:[/b] ${dateTimeToUtc(endDateTime)} [ooc]UTC[/ooc]

[b]Field Treated:[/b] ${fieldTreated}
[b]Hospitalized:[/b] ${hospitalized}

[b]Notes [Optional]:[/b]

${notes}

[hr]
[b]Signature[/b]
[img]${signature}[/img]
[i]${name}[/i]
[b][i]${rank}[/i][/b]
[/divbox]
[LSEMSfooter][/LSEMSfooter]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )

        newPage && window.open(destination, '_blank')
    }
}
