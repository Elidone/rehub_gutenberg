/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
} = wp.blockEditor || wp.editor;

const ALIGNMENT_CONTROLS = [
    {
        icon: 'editor-alignleft',
        title: __( 'Align Text Left','rehub-theme-child' ),
        align: 'left',
    },
    {
        icon: 'editor-aligncenter',
        title: __( 'Align Text Center','rehub-theme-child' ),
        align: 'center',
    },
    {
        icon: 'editor-alignright',
        title: __( 'Align Text Right','rehub-theme-child' ),
        align: 'right',
    },
    {
        icon: 'editor-justify',
        title: __( 'Align Text Justify','rehub-theme-child' ),
        align: 'justify',
    },
];

export default class Controls extends Component {

    render() {
        const { attributes: { blockAlignment, textalign }, setAttributes } = this.props;

        return (
            <BlockControls>
	            <BlockAlignmentToolbar
		            value={ blockAlignment }
		            onChange={ blockAlignment => setAttributes( { blockAlignment} ) }
		            controls={ [ 'wide', 'full' ] }
	            />
	            <AlignmentToolbar
		            value={ textalign }
		            onChange={ textalign => setAttributes( { textalign} ) }
                    alignmentControls={ALIGNMENT_CONTROLS}
	            />
            </BlockControls>
        );
    }
}
