<?php
/**
 * Plugin Name: Pillar Press - Content Blocks
 * Plugin URI: https://pillar.press/
 * Description: The cornerstone of content creation for WordPress. Created by <a href="https://www.twitter.com/deviorobert" target="_blank">Robert DeVore</a>.
 * Author: Pillar Press
 * Author URI: http://pillar.press
 * Version: 0.0.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package PPCB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
