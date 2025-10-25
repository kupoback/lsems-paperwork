export const generateSaaaPilots = ({fullName, phoneNumber, auscultation, coverTest, audioMeterTest, drugTest}, {internalRank, name, rank, signature}, destination, newPage = false) => {
    if (!internalRank || !name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/yrVPI6t.png[/img]
[lsemssubtitle]PATIENT INFORMATION[/lsemssubtitle]
[divbox=white]
[b]Full name:[/b] ${fullName}
[hr]
[b]Phone number:[/b] ${phoneNumber}
[hr]
[/divbox]
[lsemssubtitle]PHYSICAL EXAMINATION[/lsemssubtitle]
[divbox=white]
[b]Auscultation:[/b] ${auscultation}
[hr]
[b]Cover Test *using corrective lenses if prescribed*:[/b]
${coverTest || 'N/A'}
[hr]
[b]Audio-meter Test *using corrective equipment if prescribed*:[/b]
${audioMeterTest || 'N/A'}
[hr]
[b]Drug Test:[/b] ${drugTest}
[hr]
[/divbox]
[divbox=white]

[img]${signature}[/img]
[i]${name}[/i]
[b]${internalRank} / ${rank}[/b]
[b]Los Santos Emergency Medical Services[/b]
[/divbox][img]https://i.imgur.com/HNP4ksW.png[/img]`

        navigator.clipboard.writeText(template).then(
            () => {},
            e => console.error(e),
        )
        newPage && window.open(destination, '_blank')
    }
}
