<?php

include "config.php";

$contentdata = file_get_contents('php://input');
$getdata= json_decode($contentdata);
$email=$getdata->email;
$pass=$getdata->pass;

$sql ="SELECT * FROM `customer_accounts` WHERE `EmailAddress`='$email' AND `Password`='$pass'";
$result =mysqli_query($con,$sql);
$numrow=mysqli_num_rows($result);

if($numrow==1)
{
    $arr=array();
    while($row=mysqli_fetch_assoc($result)){
        $arr[]=$row;
    }
    echo json_encode($arr);
    mysqli_close($con);

}
else{
    echo json_encode(null);
}
?>