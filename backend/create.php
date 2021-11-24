<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

$CustomerName = $data['CustomerName'];
$CustomerAddress = $data['CustomerAddress'];
$Age = $data['Age'];
$Gender = $data['Gender'];
$ContactNo = $data['ContactNo'];
$username = $data['Username'];
$email = $data['EmailAddress'];
$password = $data['Password'];

$q = mysqli_query($con, "INSERT INTO `customer_accounts` (`CustomerName`, `CustomerAddress`, `Age`, `Gender`, `ContactNo`, `Image`, `Username`, `EmailAddress`, `Password`) 
VALUES ('$CustomerName', '$CustomerAddress', '$Age', '$Gender', '$ContactNo', 'icon.png', '$username', '$email', '$password')");

if ($q) {
	http_response_code(201);
	$message['status'] = "Success";
} else {
	http_response_code(422);
	$message['status'] = "Error";
}

echo json_encode($message);
echo mysqli_error($con);