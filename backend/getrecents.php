<?php
include "config.php";
$contentdata=file_get_contents("php://input");
$getdata=json_decode($contentdata);
$getaccID=$getdata->accountID;

$sql ="SELECT store_records.StoreID, users.Image,users.StoreName,users.StoreAddress,store_records.time_in,store_records.time_out,store_records.time_out,store_records.time_in,users.ContactNo,users.OpenHours,users.maximum_cust
FROM users
LEFT JOIN store_records
ON store_records.StoreID = users.id WHERE store_records.AccountID='$getaccID' Order By time_in DESC";
$result =mysqli_query($con,$sql);
$numrow=mysqli_num_rows($result);

if($numrow>0)
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