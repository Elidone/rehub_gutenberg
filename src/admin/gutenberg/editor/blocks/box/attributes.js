import {slug} from './help';
const {__} = wp.i18n;


const backAttrs = RehubGutenberg.attributes[slug];

const attributes = Object.assign({},
	{
		...backAttrs
	}
);

export default attributes;
