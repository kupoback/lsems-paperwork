import {dateToUtc, timeToUtc} from '@utils/mixins'

export const generateMethadone = (
    {
        fullName,
        phoneNumber,
        drugsFound,
        prescription,
        amountIssued,
        educated,
    },
    {
        name,
        rank,
        signature
    },
    destination,
    newPage = false) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/EhBBYPq.png[/img]
[lsemssubtitle]GENERAL INFORMATION[/lsemssubtitle]
[divbox=white]
[b]Issuing Employee:[/b] [i]${name}[/i]
[b]Employee Rank:[/b] [i]${rank}[/i]
[b]Date:[/b] ${dateToUtc()}
[b]Time:[/b] ${timeToUtc()}
[/divbox]
[lsemssubtitle]ENCOUNTER DETAILS[/lsemssubtitle]
[divbox=white]
[b]Patient's name:[/b] [i]${fullName}[/i]
[b]Patient's phone number:[/b] [i]${phoneNumber || ''}[/i]
[b]Drug found upon testing:[/b] [i]${drugsFound}[/i]
[b]Prescription issued because:[/b] [i]${prescription}[/i]
[b]Amount issued*: ${amountIssued}[/b]
[b]Has the patient been educated on methadone usage and the potential dangers of misuse?[/b] ${educated ? "Yes" : "No"}

[i][size=85]*one box/pack of methadone contains 10 (ten) pills[/size][/i]
[/divbox]

[lsemssubtitle]LIABILITY WAIVER[/lsemssubtitle]
[divbox=#ffffde]
I, [i]${rank} ${name}[/i], hereby declare that I have filled out the above form and have issued the prescribed medication without falsifying any & all documentation and/or drug tests.
[/divbox]
[LSEMSfooter][/LSEMSfooter]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )
        newPage && window.open(destination, '_blank')
    }
}
