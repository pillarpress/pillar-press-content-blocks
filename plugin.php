<?php
/**
 * Plugin Name: Pillar Blocks
 * Plugin URI: https://pillar.press/plugin
 * Description: Custom Gutenberg Blocks created by Robert DeVore.
 * Author: deviodigital
 * Author URI: http://www.robertdevore.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package PPB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
