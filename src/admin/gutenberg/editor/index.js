import {
	registerBlockType,
} from '@wordpress/blocks';

import blocks from './blocks';

Object.values(blocks).forEach(({slug, blockProperty}) => {
		registerBlockType(slug, blockProperty);
});

import 'react-select2-wrapper/css/select2.css';
import './style.scss';

