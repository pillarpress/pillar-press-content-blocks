/**
 * BLOCK: pillar-press Spacer
 */

// Import CSS.
import './editor.scss';
import './style.scss';

// External Dependencies.
import classnames from 'classnames';
import ResizableBox from 're-resizable';

// Internal Dependencies.
const { __ } = wp.i18n;
const {
	RangeControl,
} = wp.components;
const {
	registerBlockType,
	InspectorControls
} = wp.blocks;

/**
 * Register: pillar-press Spacer Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'pillar-press/spacer', {
	title: __( 'Spacer' ),
	description: __( 'Add space between blocks.' ),
	icon: 'image-flip-vertical',
	category: 'layout',
	keywords: [
		__( 'spacer' ),
		__( 'separator' ),
		__( 'pillar' ),
	],
	supports: {
		html: false,
	},
	attributes: {
		height: {
			type: 'number',
			default: 50,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit( { className, attributes, setAttributes, isSelected, toggleSelection } ) {

		const { height } = attributes;

		const inspectorControls = isSelected && (
			<InspectorControls key="inspector">
				<RangeControl
					label={ __( 'Height' ) }
					value={ height || '' }
					onChange={ ( value ) => setAttributes( { height: value } ) }
					min={ 30 }
					max={ 800 }
				/>
			</InspectorControls>
		);

		return [

			inspectorControls,
			<ResizableBox
				className={ classnames( className, 'pillar-press-spacer-control' ) }
				size={ {
					width: '100%',
					height: height,
				} }
				minWidth= { '100%' }
				maxWidth= { '100%' }
				minHeight= { '100%' }
				handleClasses={ {
					bottomLeft: 'pillar-press-block-spacer-control__resize-handle',
				} }
				enable={ { top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: true, topLeft: false } }
				onResizeStart={ () => {
					toggleSelection( false );
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes( {
						height: parseInt( height + delta.height, 10 ),
					} );
					toggleSelection( true );
				} }
			>
			</ResizableBox>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save( { attributes, className } ) {

		const { height } = attributes;

		return (
			<hr className={ className } style={ { height: height ? height + 'px' : undefined } }></hr>
		);
	},
} );
