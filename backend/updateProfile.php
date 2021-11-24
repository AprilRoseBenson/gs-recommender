<?php
include "config.php";

$input = file_get_contents('php://input');
$data= json_decode($input,true);
$message = array();
$CustomerName = $data['CustomerName'];
$CustomerAddress = $data['CustomerAddress'];
$Age = $data['Age'];
$Gender = $data['Gender'];
$ContactNo = $data['ContactNo'];
$AccountID = $_GET['AccountID'];


$q=mysqli_query($con, "UPDATE `customer_accounts` SET `CustomerName` = '$CustomerName', `CustomerAddress` = '$CustomerAddress', `Age` = '$Age', `Gender` = '$Gender', `ContactNo` = '$ContactNo' WHERE `AccountID` = '$AccountID' LIMIT 1");

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