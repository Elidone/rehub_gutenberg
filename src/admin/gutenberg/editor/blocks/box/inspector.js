const {__} = wp.i18n;
const {Component} = wp.element;
const {
	InspectorControls,
} = wp.blockEditor || wp.editor;

const {
	PanelBody,
	SelectControl,
	TextControl,
} = wp.components;

import {ToggleControl} from "@wordpress/components";

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {
			attributes: {
				type,
				title,
				float,
				textalign,
				date,
				takeDate,
				label,
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
							{value: 'info', label: __('Info', 'rehub-theme-child')},
							{value: 'download', label: __('Download', 'rehub-theme-child')},
							{value: 'error', label: __('Error', 'rehub-theme-child')},
							{value: 'warning', label: __('Warning', 'rehub-theme-child')},
							{value: 'yellow', label: __('Yellow color box', 'rehub-theme-child')},
							{value: 'green', label: __('Green color box', 'rehub-theme-child')},
							{value: 'gray', label: __('Gray color box', 'rehub-theme-child')},
							{value: 'blue', label: __('Blue color box', 'rehub-theme-child')},
							{value: 'red', label: __('Red color box', 'rehub-theme-child')},
							{value: 'dashed_border', label: __('Dashed', 'rehub-theme-child')},
							{value: 'solid_border', label: __('Solid border', 'rehub-theme-child')},
							{value: 'transparent', label: __('Transparent background box', 'rehub-theme-child')},
						]}
						value={type}
						onChange={(type) => setAttributes({type})}
					/>
                	<SelectControl
						label={__('Box float', 'rehub-theme-child')}
						options={[
							{value: 'none', label: __('None', 'rehub-theme-child') },
							{value: 'left', label: __('Left', 'rehub-theme-child') },
							{value: 'right', label: __('Right', 'rehub-theme-child') },
						]}
						value={float}
						onChange={(float) => setAttributes({float})}
					/>
					<SelectControl
						label={__('Text align', 'rehub-theme-child')}
						options={[
							{value: 'left', label: __('Left', 'rehub-theme-child')},
							{value: 'right', label: __('Right', 'rehub-theme-child')},
							{value: 'justify', label: __('Justify', 'rehub-theme-child')},
							{value: 'center', label: __('Center', 'rehub-theme-child')},
						]}
						value={textalign}
						onChange={(textalign) => setAttributes({textalign})}
					/>
					<ToggleControl
						label={__('Take current date','rehub-theme-child')}
						checked={ takeDate }
						onChange={(takeDate) => {
							const date = new Date();
							setAttributes({takeDate, date: date.getDate()+'.'+(date.getMonth()+1)})
						}}
					/>
					{!!+takeDate && <TextControl
						label={__('Label','rehub-theme-child')}
						value={label}
						onChange={(label) => setAttributes({label})}
					/>}
				</PanelBody>
			</InspectorControls>
		);
	}
}
