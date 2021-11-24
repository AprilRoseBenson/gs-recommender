<?php
include "config.php";
$contentdata=file_get_contents("php://input");
$getdata=json_decode($contentdata);
$getaccID=$getdata->StoreID;

$sql ="SELECT count(time_in) as numbercount FROM `store_records` WHERE time_in >= CURDATE() AND time_out IS NULL AND StoreID='$getaccID'";
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