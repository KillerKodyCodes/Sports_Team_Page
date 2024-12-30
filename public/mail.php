<?php
//this will be tested once hosted
//mail() won't work locally

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];


$mailHeader = "From:".$name."<".$email.">\r\n";
$recipient = "killerbyrd12@gmail.com";


mail($recipient, "Sponsorship Inquiry", $message, $mailHeader)or die('error');

echo"Message Sent";


?>