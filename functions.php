<?php

	include_once 'admin/api-endpoints.php';
	/* Add ACF Options page */
	if (function_exists('acf_add_options_page')) {
	    acf_add_options_page('Global Options');
	}

	register_nav_menus(array(
	    'main-menu' => esc_html__('Main Menu', 'ttm')
	));