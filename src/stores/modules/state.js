import {useStorage} from "@vueuse/core";

const conclusion = {
    content: '',
    conclusions: [
        '',
    ],
}

const logging = {
    content: '',
    updates: [
        "",
    ],
}

const media = {
    title: '',
    items: [
        {
            type: 'text',
            content: '',
            ooc: false,
        }
    ]
};

const suspect = {
	additionalInfo: '',
	clothing: '',
	description: '',
	facialHair: '',
	features: '',
	gender: '',
	hair: '',
	image: '',
	name: '',
	phone: '',
	skin: '',
	vehicles: [
		"",
	],
	charges: [
		"",
	]
};

const victimWitness = {
	date: '',
	image: '',
	name: '',
	officer: '',
	phone: '',
	statement: '',
	type: '',
}

export default ({
	defaults: {
        conclusion,
        logging,
		media,
		suspect,
		victimWitness,
	},
    conclusion: useStorage('conclusion', conclusion),
    logging: useStorage('logging', logging),
	media:useStorage('media', media),
	suspect: useStorage('suspect', suspect),
	victimWitness: useStorage('victimWitness', victimWitness),
	mediaTypes: [
		{
			name: 'Text',
			value: 'text',
		},
		{
			name: 'Link',
			value: 'link',
		},
		{
			name: 'Image',
			value: 'image',
		},
		{
			name: 'FImage',
			value: 'fimage',
		},
	],
	types: [
		{
			label: 'Select Type',
			value: '',
			disabled: true,
		},
		{
			label: 'Victim',
			value: 'Victim',
		},
		{
			label: 'Witness',
			value: 'Witness',
		},
	]
})
