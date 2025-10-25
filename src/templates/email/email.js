import {dateToUtc} from '@util/mixins'

export const generateEmail = ({subject, to, body}, {internalRank, name, rank, signature}, destination, newPage = false) => {
    if (!internalRank || !name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/rLIJtNZ.png[/img]
[divbox=white]
[img]https://i.imgur.com/9uGiPqF.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]
[size=150]Los Santos Emergency Medical Services[/size][/b]
[size=95]"One Team, One Mission, Saving Lives"[/size][/font]
[size=115]${subject}[/size]
[size=95]${dateToUtc()}[/size]
[/right][/aligntable]
[hr]
[list=none]

${to && `[b]${to}[/b],`}

${body}

[/list]
[hr][/hr]

Be well,

[img]${signature}[/img]
[i]${name}[/i]
[b]${rank}[/b]
[b]Los Santos Emergency Medical Services[/b]
[/divbox]
[LSEMSfooter][/LSEMSfooter]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )

        newPage && window.open(destination, '_blank')
    }
}
