<?php 
class Tonk_Rest_Server {      
    // Register our REST Server

    public function hook_rest_server(){
        add_action( 'rest_api_init', array( $this, 'register_routes' ));
    }
    public function register_routes() {
        register_rest_route( 'tonk/v2', '/menu', array(
			'methods' => 'GET',
			'callback' => array( $this, 'get_main_menu' ),
			'args' => array(
				'id' => array(
					'validate_callback' => function($param, $request, $key) {
						return is_numeric( $param );
					}
				)
			)
		));
		register_rest_route( 'tonk/v2', '/social', array(
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_social_menu' )
            ),
        ));
        register_rest_route( 'tonk/v2', '/home', array(
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_front_page' )
            ),
        ));
        register_rest_route( 'tonk/v2', '/page/(?P<id>\d+)', array(
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_page_content' ),
                'args' => array(
                    'id' => array(
                        'validate_callback' => function($param, $request, $key) {
                            return is_numeric( $param );
                        }
                    )
                )
            )
        ));
        register_rest_route( 'tonk/v2', '/contact', array(
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_contact_page' )
            ),
        ));
        register_rest_route( 'tonk/v2', '/form-fields', array(
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_form_fields' )
            ),
        ));
        register_rest_route( 'tonk/v2', '/form', array(
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'post_contact_form' )
            ),
        ));

    }

    public function get_main_menu( $data ) {
    	$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
	    /* Retrieve the menu in location main-menu */
	    $menu = wp_get_nav_menu_object('main-menu');

	    /* Create an empty array to store our JSON */
	    $menuItems = array();

	    /* If the menu isn't empty, start process of building an array, otherwise return a 404 error */
	    if (!empty($menu)) {

	    	/* Assign array of navigation items to $menu_items variable */
	    	$menu_items = wp_get_nav_menu_items($menu->term_id);
	        /* if $menu_items isn't empty */
	        if ($menu_items) {
	            /* for each menu item, verify the menu item has no parent and then push the menu item to the $menuItems array */
	            foreach ($menu_items as $key => $menu_item) {
	                if ($menu_item->menu_item_parent == 0) {
	                	$class = $menu_item->classes;
	                    array_push(
	                        $menuItems, array(
	                            'title' => $menu_item->title,
	                            'url' => str_replace($url, '', $menu_item->url),
	                            'class' => $class[0]
	                        )
	                    );
	                }
	            }
	        }
	    }

	    /* Return array of list items with title and url properties */
		return $menuItems;
    }

    public function get_social_menu() {
    	$socialLinks = [];
    	$facebook = get_field('facebook', 'options');
    	$linkedin = get_field('linkedin', 'options');
    	$instagram = get_field('instagram', 'options');
        $github = get_field('github', 'options');
    	if($facebook) {
    		$obj = new \stdClass;
    		$obj->link = $facebook;
    		$obj->type = 'facebook-f';
    		array_push($socialLinks, $obj);
    	}
    	if($linkedin) {
    		$obj = new \stdClass;
    		$obj->link = $linkedin;
    		$obj->type = 'linkedin';
    		array_push($socialLinks, $obj);
    	}
    	if($instagram) {
    		$obj = new \stdClass;
    		$obj->link = $instagram;
    		$obj->type = 'instagram';
    		array_push($socialLinks, $obj);
    	}
        if($github) {
            $obj = new \stdClass;
            $obj->link = $github;
            $obj->type = 'github';
            array_push($socialLinks, $obj);
        }
    	return $socialLinks;
    }
    public function get_form_fields() {
        $fields = get_field('form_fields', 'options');
        $obj = new \stdClass;
        if($fields) {
            $obj->fields = array();
            $y = 0;
            foreach ($fields as $field) {
                $y++;
                $formObj = new \stdClass;
                $formObj->title = $field['name'];
                $formObj->type = $field['type'];
                $formObj->name = str_replace(' ', '', $field['name'].$y);
                $formObj->value = '';
                $formObj->active = '';
                $formObj->error = '';
                $formObj->errorClass = 'error-box'; 
                if($field['type'] == 'email') {
                    $formObj->errorMessage = 'Please enter a valid email address.';
                } else {
                    $formObj->errorMessage = 'Please complete this field.';
                }
                array_push($obj->fields, $formObj);
            }
            $obj->thank_you_message = get_field('form_thank_you_message', 'options');
            return $obj;
        }
    }
    public function get_front_page() {
    	$frontpage_id = get_option('page_on_front');
    	$obj = new \stdClass;
    	$obj->title1 = get_field('title_1', $frontpage_id);
    	$obj->title2 = get_field('title_2', $frontpage_id);
    	$obj->title3 = get_field('title_3', $frontpage_id);
    	$obj->content = get_field('content', $frontpage_id);
    	return $obj;
    }
    public function get_page_content($data) {
        $pageId = $data['id'];
        $i_layouts = 0;
        $mainArray = array();
        while(has_sub_field('page_builder', $pageId)) {
            $i_layouts++;
            $rows = get_row_layout();
            $obj = new \stdClass;
            $obj->type = $rows;
            if($rows == 'title_and_content_block') {
                $titles = get_sub_field('titles');
                $obj->content = get_sub_field('content');
                $obj->title = array();
                foreach ($titles as $title) {
                    array_push($obj->title, $title);
                }
            }
            if($rows == 'map') {
                $obj->lat = get_sub_field('lat');
                $obj->long = get_sub_field('long');
            }
            if($rows == 'rotating_text') {
                $obj->rotating_text = array();
                $rotating_text = get_sub_field('rotating_text');
                foreach ($rotating_text as $text) {
                    array_push($obj->rotating_text, $text['text']);
                }
            }
            if($rows == 'form') {
                $fields = get_sub_field('form_layout');
                $obj->fields = array();
                $y = 0;
                foreach ($fields as $field) {
                    $y++;
                    $formObj = new \stdClass;
                    $formObj->title = $field['name'];
                    $formObj->type = $field['type'];
                    $formObj->name = str_replace(' ', '', $field['name'].$y);
                    $formObj->value = '';
                    $formObj->active = '';
                    $formObj->error = '';
                    $formObj->errorClass = 'error-box'; 
                    if($field['type'] == 'checkbox') {
                        $formObj->isChecked = false;
                    } elseif($field['type'] == 'email') {
                        $formObj->errorMessage = 'Please enter a valid email address.';
                    } else {
                        $formObj->errorMessage = 'Please complete this field.';
                    }
                    array_push($obj->fields, $formObj);
                }
                $obj->thank_you_message = get_sub_field('form_thank_you_message');
            }
            array_push($mainArray, $obj);
        }
        return $mainArray;
      
    }

    public function get_contact_page() {
        $page = get_page_by_path('contact');
        $id = $page->ID;
        $obj = new \stdClass;
        $obj->title = get_field('title', $id);
        $obj->content = get_field('content', $id);
        return $obj;
    }

    public function post_contact_form() {
        $_POST = json_decode(file_get_contents("php://input"),true);
        $formData = $_POST['formData'];
        $name = '';
        $email = '';
        $message = '';
        $body = '';
        foreach ($formData as $data) {
            $title = $data['title'];
            $value = $data['value'];
            $body .= <<<EOT
        <div class="email-row"><strong>{$title}:</strong></div>
        <div style="margin-bottom: 10px" class="email-row">{$value}</div>
EOT;
        }
        $to = get_field('form_email', 'options');
        $subject = 'Tonk Website Form Submission';

        $headers[] = 'Content-Type: text/html; charset=UTF-8';
        $headers[] = 'From: Tonk Website <no-reply@tonk.uk>';
        $mail = wp_mail( $to, $subject, $body, $headers );
        return 'true';
    }
}

$Tonk_Rest_Server = new Tonk_Rest_Server();
$Tonk_Rest_Server->hook_rest_server();