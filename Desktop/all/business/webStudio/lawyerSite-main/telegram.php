<?php
//  if(isset($_POST['submitButton'])){
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['comm'];
$token = "5665575490:AAHs9e42zbWayKSMK_bPTv0fui8PZ_EWCV0";
$chat_id = "507129997";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo "Sended";
} else {
  echo "Error";
}
//  }
?>