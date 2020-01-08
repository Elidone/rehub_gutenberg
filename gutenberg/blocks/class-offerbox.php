<?php

	namespace Rehub\Gutenberg\Blocks;

	defined('ABSPATH') OR exit;

	use Elementor\Widget_Wpsm_Box;
	use WP_REST_Request;
	use WP_REST_Server;

	class Offerbox extends Basic {
		protected $name = 'offerbox';

		protected $attributes = array(
			'posts' => array(
				'type'    => 'number',
				'default' => 2,
			),
			'offer_url' => array(
				'type' => 'string',
				'default' => '',
			),
			'offer_title' => array(
				'type' => 'string',
				'default' => 'Offer title',
			),
			'offer_desc' => array(
				'type' => 'string',
				'default' => '',
			),
			'disclaimer' => array(
				'type' => 'string',
				'default' => '',
			),
			'offer_price_old' => array(
				'type' => 'string',
				'default' => '',
			),
			'offer_price' => array(
				'type' => 'string',
				'default' => '',
			),
			'percentageSaved' => array(
				'type' => 'number',
				'default' => '',
			),
			'rating' => array(
				'type' => 'number',
				'default' => '',
			),
			'offer_coupon' => array(
				'type' => 'string',
				'default' => '',
			),
			'offer_coupon_date' => array(
				'type' => 'string',
				'default' => '',
			),
			'offer_coupon_mask' => array(
				'type' => 'string',
				'default' => 'Reveal coupon',
			),
			'offer_coupon_mask_text' => array(
				'type' => 'string',
				'default' => '',
			),
			'offer_btn_text' => array(
				'type' => 'string',
				'default' => '',
			),
			'image_id' => array(
				'type' => 'string',
				'default' => '',
			),
			'bordercolor' => array(
				'type' => 'string',
				'default' => '',
			),
		);


		protected function render($settings = array()){

			$id = $settings['posts'];
			$btnwoo = '';

			if($id) {
				if('product' == get_post_type($id)) {

					$product = wc_get_product($id);

					$image_id    = get_post_thumbnail_id($id);
					$image_url   = wp_get_attachment_image_src($image_id, 'full');
					$offer_thumb = $image_url[0];

					$offer_price_old = $product->get_regular_price();
					$offer_price     = $product->get_price();
					$percentageSaved = '';
					if($offer_price_old && $offer_price_old != 0) {
						$percentageSaved = round((($offer_price_old-$offer_price)/$offer_price_old)*100);
					}
					$offer_title            = get_the_title($id);
					$offer_desc             = $product->get_short_description();
					$offer_coupon           = get_post_meta($id, 'rehub_woo_coupon_code', true);
					$rating                 = $product->get_average_rating();
					$btnwoo                 = apply_filters('woocommerce_loop_add_to_cart_link',
						sprintf('<a href="%s" data-product_id="%s" data-product_sku="%s" class="re_track_btn  btn_offer_block %s %s product_type_%s"%s %s>%s</a>',
							esc_url($product->add_to_cart_url()),
							esc_attr($product->get_id()),
							esc_attr($product->get_sku()),
							$product->is_purchasable() && $product->is_in_stock() ? 'add_to_cart_button' : '',
							$product->supports('ajax_add_to_cart') ? 'ajax_add_to_cart' : '',
							esc_attr($product->get_type()),
							$product->get_type() == 'external' ? ' target="_blank"' : '',
							$product->get_type() == 'external' ? ' rel="nofollow"' : '',
							esc_html($product->add_to_cart_text())
						),
						$product);
					$offer_coupon_mask_text = '';
					$disclaimer             = get_post_meta($id, 'rehub_offer_disclaimer', true);

				} else {
					$offer_post_url    = get_post_meta($id, 'rehub_offer_product_url', true);
					$offer_post_url    = apply_filters('rehub_create_btn_url', $offer_post_url);
					$offer_url         = apply_filters('rh_post_offer_url_filter', $offer_post_url);
					$offer_price       = get_post_meta($id, 'rehub_offer_product_price', true);
					$offer_price_old   = get_post_meta($id, 'rehub_offer_product_price_old', true);
					$offer_title       = get_post_meta($id, 'rehub_offer_name', true);
					$offer_thumb       = get_post_meta($id, 'rehub_offer_product_thumb', true);
					$offer_btn_text    = get_post_meta($id, 'rehub_offer_btn_text', true);
					$offer_coupon      = get_post_meta($id, 'rehub_offer_product_coupon', true);
					$offer_coupon_date = get_post_meta($id, 'rehub_offer_coupon_date', true);
					$offer_coupon_mask = get_post_meta($id, 'rehub_offer_coupon_mask', true);
					$offer_desc        = get_post_meta($id, 'rehub_offer_product_desc', true);
					$disclaimer        = get_post_meta($id, 'rehub_offer_disclaimer', true);
					$rating            = get_post_meta($id, 'rehub_review_overall_score', true);
					if($rating) {
						$rating = $rating/2;
					}
					$offer_coupon_mask_text = '';
				}

			}
			include(rh_locate_template('inc/parts/offerbigpart.php'));
		}
	}
