import {dateToUtc} from '@util/mixins'

export const generateSaaaPilotsCert = ({fullName}, {internalRank, name, rank, signature}, destination, newPage = false) => {
    if (!internalRank || !name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/M7FTbHm.png[/img]

[divbox=white]
[color=transparent]spacer[/color]
[center][fimg=130,130]https://i.imgur.com/QYXPM0p.png[/fimg]
[color=transparent]spacer[/color]
[img]https://i.imgur.com/7x0vy1x.png[/img][/center]
[color=transparent]spacer[/color]
[center][size=140]${fullName}[/size]
[color=transparent]spacer[/color]
[size=120]was examined by AMU staff on [b]${dateToUtc()}[/b]
and found medically fit to be educated on and practice as:
[ ] An Aircraft Pilot
[ ] A Jumpmaster.[/size]


[center][img]https://i.imgur.com/7x0vy1x.png[/img][/center]

[hr][/hr]

[i][b]Examination performed by:[/b][/i]

[img]${signature}[/img]
[i]${name}[/i]
[b]${internalRank} / ${rank}[/b]
[b]Los Santos Emergency Medical Services[/b]

[/divbox][lsemsfooter]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )
        newPage && window.open(destination, '_blank')
    }
}
