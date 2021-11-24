<?php
include "config.php";
$contentdata=file_get_contents("php://input");


$sql ="SELECT COUNT(store_records.StoreID), (SELECT count(store_records.time_in) FROM `store_records` WHERE store_records.time_in >= CURDATE() AND store_records.time_out IS NULL AND store_records.StoreID=users.id) as customer,users.id, users.ContactNo, users.OpenHours, users.maximum_cust, users.Image,users.StoreName, users.StoreAddress,store_records.time_in,store_records.time_out FROM users LEFT JOIN store_records ON store_records.StoreID = users.id GROUP By users.id HAVING customer < users.maximum_cust ORDER BY customer ";
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