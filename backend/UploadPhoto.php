<?php
 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
 header('Access-Control-Allow-Headers: token, Content-Type');
 header('Access-Control-Max-Age: 1728000');
 header('Content-Length: 0');
 header('Content-Type: text/plain');
 try{
     $bdd=new \pdo('mysql:host=localhost;dbname=gs-ra','root','',array(PDO::ATTR_EMULATE_PREPARES=>false,PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));

 }catch(Exception $e){
     echo 'Can\'t connect:'.$e->getMessage().'<br/>';
 }
if (isset($_FILES['Image'])){
    $contentdata = file_get_contents('php://input');
    $getdata= json_decode($contentdata);
    $AccountID=$_POST['AccountID'];
    $img=uploadImage('Image');
    $stmt=$bdd->prepare("UPDATE `customer_accounts` SET `Image` = :Image WHERE `AccountID` = '$AccountID' LIMIT 1");
    $stmt->execute(array(':Image'=>$img));
    echo json_encode($_FILES['Image']);
}
function uploadImage($imgName){
    if (isset($_FILES[$imgName])){
        $img_tmp=$_FILES[$imgName]['tmp_name'];
        $imgFolder='/gs-app/images/';
     $des = "C:/xampp/htdocs/gs-app/images/";

        if(file_exists($img_tmp)){
            $taille_maxi=1000000;
            $taille=filesize($_FILES[$imgName]['tmp_name']);
            $imgsize=getimagesize($_FILES[$imgName]['tmp_name']);
            $extensions=array('.png','.gif','.jpg','.jpeg');
            $extension=strtolower(strrchr($_FILES[$imgName]['name'],'.'));

            if($imgsize['mime']=='image/jpeg'){
                $img_src=imagecreatefromjpeg($img_tmp);
            }elseif($imgsize['mime']=='image/png'){
                $img_src=imagecreatefrompng($img_tmp);
            }elseif($imgsize['mime']=='image/gif'){
                $img_src=imagecreatefromgif($img_tmp);
            }
            $new_width=380;
            $new_height=380;
            $image_finale=imagecreatetruecolor($new_width,$new_height);

            imagecopyresampled($image_finale,$img_src,0,0,0,0,$new_width,$new_height,$imgsize[0],$imgsize[1]);
           // $imgName=$image.'.jpg';
            $imgName = addslashes($_FILES['Image']['name']);
         //   imagejpeg($image_finale,$imgName);
           move_uploaded_file($img_tmp,$des.$imgName);
            return $imgName;
        }
    }
}
?>