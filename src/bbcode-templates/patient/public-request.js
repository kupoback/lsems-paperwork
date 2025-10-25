import {dateTimeToUtc} from '@utils/mixins'

export const generatePublicRequest = (
    {
        fullName,
        contactMethod,
        details
    }, {
        divisionalRanks,
        name,
        rank,
        signature
    }, destination, newPage = false) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/Wxpv58D.png[/img]
[divbox=white]
[hr]
[b]Patient Name:[/b] ${fullName}
[hr]
[b]Date / Time:[/b] ${dateTimeToUtc()}
[hr]
[b]Contact Method:[/b] ${contactMethod}
[hr]
[b]Details:[/b] ${details}
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
