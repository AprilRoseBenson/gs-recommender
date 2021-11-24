<?php
include "config.php";
$data =array();
$account_id = $_GET['AccountID'];
$q = mysqli_query($con, "SELECT * FROM `customer_accounts` WHERE `AccountID`= $account_id  LIMIT 1 ");

while($row = mysqli_fetch_object($q)){
    $data[] =$row;
}
echo json_encode($data);
echo mysqli_error($con);