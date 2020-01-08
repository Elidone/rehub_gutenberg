import Inspector from './inspector';
import Controls from './controls';
import classnames from 'classnames';

import ServerSideRender from '../../components/SSR';

const {withSelect} = wp.data;
const {compose} = wp.compose;
import {slug} from './help';


const {
	RichText,
} = wp.blockEditor || wp.editor;

const {__} = wp.i18n;
const {Component} = wp.element;

const {
	TextControl,
} = wp.components;

class EditBlock extends Component {
	render() {
		const {
			isSelected,
			setAttributes,
			attributes: {
				style,
				title,
				text,
			},
			attributes,
		} = this.props;

		let themeclass = '',
			colorclass = '';

		switch (style) {
			case 'main':
				themeclass = ' rehub-main-color-border';
				colorclass = 'rehub-main-color';
				break;
			case 'secondary':
				themeclass = ' rehub-sec-color-border';
				colorclass = 'rehub-sec-color';
				break;
		}

		const _content = <div className={classnames(
			'wpsm-titlebox',
			`wpsm_style_${style}`,
			themeclass
		)}>
			<strong>
				<RichText
				placeholder={__('Title', 'rehub-theme-child')}
				value={title}
				onChange={(title) => setAttributes({title})}
				multiline={false}
				allowedFormats={[]}
				keepPlaceholderOnFocus={true}
				className={colorclass}
				unstableOnSplit={ () => false }
			/>
			</strong>
			<div>
				<RichText
					placeholder={__('Content', 'rehub-theme-child')}
					value={text}
					onChange={text => setAttributes({text})}
					keepPlaceholderOnFocus={true}
				/>
			</div>
		</div>;

	return (
			<>
				{isSelected && <>
					<Inspector {...this.props} />
					<Controls {...this.props} />
				</>}
				<ServerSideRender block={slug} attributes={ attributes } />
			</>
		)
	}
}

export default EditBlock;
