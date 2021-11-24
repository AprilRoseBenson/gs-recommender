<?php
include "config.php";

$input = file_get_contents('php://input');
$data= json_decode($input,true);
$message = array();
$account_id = $_GET['AccountID'];
$password = $data['Password'];

$q=mysqli_query($con, "UPDATE `customer_accounts` SET `Password`='$password' WHERE `AccountID` = '$account_id' LIMIT 1");

if ($q){
    http_response_code(201);
    $message['status'] = "Success";
}
else{
    http_response_code(422);
    $message['status'] = "Error"; 
}

echo json_encode($message);
echo mysqli_error($con);