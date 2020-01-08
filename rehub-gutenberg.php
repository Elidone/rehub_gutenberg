<?php
/*
Plugin Name: REHub Gutenberg
Plugin URI: https://1.envato.market/JZgzN
Description: Framework plugin for REHub - Price Comparison, Affiliate Marketing, Multi Vendor Store, Community Theme.
Version: 2.9
Author: Sizam
Author URI: https://wpsoul.com/
Text Domain: rehub-framework
Domain Path: /lang/
*/
require_once __DIR__.'/class-autoload.php';

//add_action('rehub_framework_loaded', function(){
	Rehub\Gutenberg\Init::instance();
//});
