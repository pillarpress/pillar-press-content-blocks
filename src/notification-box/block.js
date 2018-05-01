/**
 * BLOCK: pillar-press Notification Box
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import Icons.
import icon from './icons/icon';
import info from './icons/info';
import success from './icons/success';
import warning from './icons/warning';
import error from './icons/error';

// Importing Classname.
import classnames from 'classnames';

// Import CSS.
import './style.scss';
import './editor.scss';

// Import __() from wp.i18n.
const { __ } = wp.i18n;

const {
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.blocks;

const {
	Toolbar,
	Button,
	Tooltip,
	withState
} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'pillar-press/notification-box', {
	title: __( 'Notices' ),
	description: __( 'Add customizable notification boxes.' ),
	icon: icon,
	category: 'formatting',
	keywords: [
		__( 'notices' ),
		__( 'notification' ),
		__( 'pillar' ),
	],
  attributes: {
    pillar_press_notify_info: {
        type: 'array',
        source: 'children',
        selector: '.pillar_press_notify_text',
        default: 'Replace this notification text with your own.'
    },
		pillar_press_selected_notify: {
	    	type: 'string',
				default: 'pillar_press_notify_info'
		}
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: withState( { editable: 'content', } ) ( function( props )
    {
      const {
          isSelected,
          editable,
          setState
      } = props;

      const onSetActiveEditable = ( newEditable ) => () => {
          setState( { editable: newEditable } )
      };

      const onChangeNotifyInfo = value => {
          props.setAttributes ( { pillar_press_notify_info: value } );
      };

      const infoClassChange = value => {
          props.setAttributes( { pillar_press_selected_notify: 'pillar_press_notify_info' } );
      };

      const successClassChange = value => {
          props.setAttributes( { pillar_press_selected_notify: 'pillar_press_notify_success' } );
      };

			const warningClassChange = value => {
          props.setAttributes( { pillar_press_selected_notify: 'pillar_press_notify_warning' } );
      };

			const errorClassChange = value => {
          props.setAttributes( { pillar_press_selected_notify: 'pillar_press_notify_error' } );
      };

      return [

        isSelected && (
            <BlockControls key="controls"/>
        ),

        isSelected && (
          <BlockControls key="custom-controls">

              <Toolbar className="components-toolbar">
                  <Button
                      className={ classnames(
                          'components-icon-button',
                          'components-toolbar-control',
                      )}
                      onClick = { infoClassChange }
                  >
                      { info }
                  </Button>
                  <Button
                      className={ classnames(
                          'components-icon-button',
                          'components-toolbar-control',
                      )}
                      onClick = { successClassChange }
                  >
                      { success }
                  </Button>
									<Button
                      className={ classnames(
                          'components-icon-button',
                          'components-toolbar-control',
                      )}
                      onClick = { warningClassChange }
                  >
                      { warning }
                  </Button>
									<Button
                      className={ classnames(
                          'components-icon-button',
                          'components-toolbar-control',
                      )}
                      onClick = { errorClassChange }
                  >
                      { error }
                  </Button>
              </Toolbar>

          </BlockControls>
        ),

			<div key={ 'editable' } className={ props.className }>

            <RichText
                tagName="div"
                className={ props.attributes.pillar_press_selected_notify }
                onChange={ onChangeNotifyInfo }
                value={ props.attributes.pillar_press_notify_info }
                isSelected={ isSelected && editable === 'notify_info' }
                onFocus={ onSetActiveEditable( 'notify_info' ) }
                keepPlaceholderOnFocus={true}
            />

        </div>
      ];
    },
	),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div className={ props.className }>
        <div className={ props.attributes.pillar_press_selected_notify }>
					<p className="pillar_press_notify_text">{ props.attributes.pillar_press_notify_info }</p>
        </div>
			</div>
		);
	},
} );
