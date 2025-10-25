import {dateToUtc, timeToUtc} from '@utils/mixins'

export const generateEyePrescription = (
    {
        fullName,
        summary,
        leftStrength,
        rightStrength,
        leftCylinder,
        rightCylinder,
        leftAxis,
        rightAxis,
    },
    {
        divisionalRanks,
        name,
        rank,
        signature
    },
    destination,
    newPage = false) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/jWHD8Kd.png[/img]

[lsemssubtitle]GENERAL INFORMATION[/lsemssubtitle]
[divbox=white]
[b]Issuing Employee:[/b] [i]${name}[/i]
[b]Employee Rank:[/b] [i]${divisionalRanks.amu || ''} / ${rank}[/i]
[b]Date:[/b] ${dateToUtc()}
[b]Time:[/b] ${timeToUtc()}
[/divbox]
[lsemssubtitle]ENCOUNTER DETAILS[/lsemssubtitle]
[divbox=white]
[b]Patient's name:[/b] [i]${fullName}[/i]
[b]Prescription Summary:[/b] ${summary}
[b]Prescription Details:[/b]
[table]
[tr]
	[th]EYE[/th]
	[th]SPH[/th]
	[th]CYL[/th]
	[th]AXIS[/th]
[/tr]
[tr]
	[td]L[/td]
    [td]${leftStrength || '-'}[/td]
    [td]${leftCylinder || '-'}[/td]
    [td]${leftAxis || '-'}[/td]
[/tr]
[tr]
	[td]R[/td]
	[td]${rightStrength || '-'}[/td]
    [td]${rightCylinder || '-'}[/td]
    [td]${rightAxis || '-'}[/td]
[/tr]

[/table]

[/divbox]

[lsemssubtitle]LIABILITY WAIVER[/lsemssubtitle]
[divbox=#ffffde]
I, [i]${rank} ${name}[/i], hereby declare that I have filled out the above form and have issued the prescribed glasses prescription without falsifying any & all documentation.
[/divbox]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )
        newPage && window.open(destination, '_blank')
    }
}
