<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Images extends CI_Controller {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     *	- or -
     * 		http://example.com/index.php/welcome/index
     *	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        $this->load->view('welcome_message');
    }

    public function uploadAvatar($id)
    {

        if ( !empty( $_FILES ) ) {
            $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'usersAvatar' .DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR;
            mkdir($basePath, 0700);
            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $uploadPath = $basePath . $_FILES[ 'file' ][ 'name' ];
            move_uploaded_file( $tempPath, $uploadPath );
            $answer = array( 'answer' => 'File transfer completed' );
            $json = json_encode( $answer );
            echo $json;
        } else {
            echo 'No files';
        }
    }


}
