import Inspector from './inspector';
import Controls from './controls';
import classnames from 'classnames';

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
				type,
				float,
				textalign,
				content,
				takeDate,
				date,
				label,
			},
		} = this.props;

		const _content = <div className={classnames(
				'wpsm_box',
				`${type}_type`,
				`${float}float_box`
			)}
			style={{
				textAlign: textalign,
				}}>
			<i></i>
			{takeDate && <span class="label-info">{date} {label}</span>}
				<div>
					<RichText
						placeholder={__('Content', 'rehub-theme-child')}
						value={content}
						onChange={content => setAttributes({content})}
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
				{_content}
			</>
		)
	}
}

export default EditBlock;
