<?php
/**
 * Plugin Name: Pillar Press - Content Blocks
 * Plugin URI: https://pillar.press/
 * Description: Custom Gutenberg Blocks created by Robert DeVore.
 * Author: deviodigital
 * Author URI: http://www.robertdevore.com
 * Version: 0.0.1
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
