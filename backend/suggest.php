<?php
include "config.php";
$contentdata=file_get_contents("php://input");
$getdata=json_decode($contentdata);
$getaccID=$getdata->accountID; 



$sql ="SELECT COUNT(store_records.StoreID), (SELECT count(store_records.time_in) FROM `store_records` WHERE store_records.time_in >= CURDATE() AND store_records.time_out IS NULL AND store_records.StoreID=users.id) as customer,users.id, users.ContactNo, users.OpenHours,users.maximum_cust, users.Image,users.StoreName, users.StoreAddress,store_records.time_in,store_records.time_out FROM users, store_records, customer_accounts WHERE  
store_records.StoreID = users.id AND store_records.gender=(SELECT customer_accounts.Gender FROM customer_accounts WHERE customer_accounts.AccountID='$getaccID') OR store_records.address =(SELECT customer_accounts.CustomerAddress FROM customer_accounts WHERE customer_accounts.AccountID='$getaccID')
AND customer_accounts.AccountID = store_records.AccountID AND customer_accounts.AccountID='$getaccID'
GROUP By store_records.StoreID HAVING customer < users.maximum_cust/1.25 ORDER BY customer Limit 3";

// SELECT COUNT(store_records.StoreID), (SELECT COUNT(store_records.time_in) FROM `store_records` WHERE store_records.time_out is null AND store_records.StoreID=users.id) as customer,users.id, users.ContactNo, users.OpenHours, users.Image,users.StoreName, users.StoreAddress,store_records.time_in,store_records.time_out FROM users, store_records, customer_accounts WHERE  
// store_records.StoreID = users.id AND store_records.gender=(SELECT customer_accounts.Gender FROM customer_accounts WHERE customer_accounts.AccountID=1) OR store_records.address =(SELECT customer_accounts.CustomerAddress FROM customer_accounts WHERE customer_accounts.AccountID=1)
// AND customer_accounts.AccountID = store_records.AccountID AND customer_accounts.AccountID=1$getaccID'
// GROUP By store_records.StoreID ORDER BY customer


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