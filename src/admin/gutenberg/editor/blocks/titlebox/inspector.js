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

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {
			attributes: {
				style,
				title,
				text,
			},
			setAttributes
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody
					initialOpen={true}
					title={__('Main Settings', 'rehub-theme-child')}
				>
					<SelectControl
						label={__('Type', 'rehub-theme-child')}
						options={[
							{value: '1', label: __('Grey', 'rehub-theme-child')},
							{value: '2', label: __('Black', 'rehub-theme-child')},
							{value: '3', label: __('Orange', 'rehub-theme-child')},
							{value: 'main', label: __('Main Theme Color', 'rehub-theme-child')},
							{value: 'secondary', label: __('Secondary Theme Color', 'rehub-theme-child')},
							{value: '4', label: __('Double dotted', 'rehub-theme-child')},
						]}
						value={style}
						onChange={(style) => setAttributes({style})}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
