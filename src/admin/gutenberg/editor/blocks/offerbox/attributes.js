const {__} = wp.i18n;

const attributes = Object.assign({},
	{
		style: {
			type: 'string',
			default: '1',
		},
		posts: {
			type: 'string',
			default: '',
		},
		posts_mul: {
			type: 'array',
			default: [],
		},
		text: {
			type: 'string',
			default: '',
		},
	}
);

export default attributes;
