export const generateRideAlong = (
    {
        rideAlongType,
        startTime,
        endTime,
        feedBackConcerns,
        departmentCalls,
        transportSuspect,
        suspectNotes,
        rideAlongNotes,
        additionalMandatoriesNeeded
    },
    {name, rank, signature},
    destination,
    newPage = false,
) => {
    if (!name || !rank || !signature) {
        alert('You need to make sure everything in Settings is filled out')
    } else {
        const template = `[img]https://i.imgur.com/fV26BWG.png[/img]
[lsemssubtitle]SESSION DETAILS:[/lsemssubtitle]
[divbox=white]

[b]Ride-along Type:[/b] ${rideAlongType}

[b]Time Started:[/b] ${startTime}

    [b]Time Ended:[/b] ${endTime}

[b]Did the EMR have any issues with the following?[/b]
[c]Mark each box by adding an X to it[/c]
[list]
[*][i]Radio calls:[/i] []
[*][i]Radio codes:[/i] []
[*][i]Responding to calls:[/i] []
[*][i]Closing calls:[/i] []
[*][i]Unit management:[/i] []
[*][i]Treatment:[/i] []
[*][i]Scene management:[/i] []
[*][i]Time management:[/i] []
[*][i]Call priority:[/i] []
[*][i]Driving:[/i] []
[*][i]Driving knowledge:[/i] []
[*][i]Department radio:[/i] []
[*][i]PD/SD calls:[/i] []
[/list]

[b]If anything was ticked, describe concerns below: [/b][list=none]
${feedBackConcerns}

[/list]
[b]Were there any department calls?[/b] ${departmentCalls || 'NO'}

[b]Did the EMR transport or participate in a call with a 10-15?[/b] ${transportSuspect || 'NO'}
[i]If Yes, rate their performance (1-5). Explain any issues if performance was poor[/i][list=none]
${suspectNotes}

[/list]
[b]Ride-along Notes (as detailed as possible):[/b][list=none]
${rideAlongNotes}


[/list]

[b]Additional Mandatories assigned (if any): [/b]
[i]Reminder: Only assign if there is no pending mandatories.[/i]
${additionalMandatoriesNeeded}
[color=transparent]spacer[/color]
[/divbox]
[lsemssubtitle]SIGNATURE[/lsemssubtitle]
[divbox=white]

[img]${signature}[/img]
[i]${name}[/i]
[b][i]${rank}[/i][/b]
[/divbox]
[LSEMSfooter][/LSEMSfooter]`

        navigator.clipboard.writeText(template).then(
            () => {
            },
            e => console.error(e),
        )

        newPage && window.open(destination, '_blank')
    }
}
