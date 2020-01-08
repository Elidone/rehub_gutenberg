import {set} from "immutable";

const {__} = wp.i18n;
const {Component, Fragment} = wp.element;
const {
	InspectorControls,
	PanelColorSettings,
} = wp.blockEditor || wp.editor;

const {
	PanelBody,
	SelectControl,
	TextControl,
} = wp.components;

import Select2 from "@editor/components/Select2";

/**s
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {
			attributes: {
				posts,
				posts_mul,
			},
			setAttributes
		} = this.props;

		return (
			<InspectorControls>
				<Select2
					rest={true}
					restPath={'rehub/v2/posts/get'}
					post_type={['product','post','blog']}
					value={posts}
					onChange={(posts) => setAttributes({posts}) }
				/>
			</InspectorControls>
		);
	}
}
