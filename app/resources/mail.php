<?php
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['companyName'])) {$companyName = $_POST['companyName'];}
if (isset($_POST['formDate'])) {$formDate = $_POST['formDate'];}
if (isset($_POST['formType'])) {$formType = $_POST['formType'];}
if (isset($_POST['quantity'])) {$quantity = $_POST['quantity'];}
if (isset($_POST['formName'])) {$formName = $_POST['formName'];}
if (isset($_POST['citysout'])) {$citysout = $_POST['citysout'];}

$ip = getenv(REMOTE_ADDR);
$time = date("H:i:s d M Y");
$soft = getenv(HTTP_USER_AGENT);
$url_o = getenv(HTTP_REFERER);

$sub = "=?utf-8?b?".base64_encode("Тема письма")."?="; // тема письма, принудительно в ЮТФ-8

$address = "yaglazov@gmail.com"; // куда отправлять-то?

$headers  = "From: " . strip_tags($email) . "\r\n";
$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n"; // чтобы всё пришло в правильной кодировке!

$mes  = "<html><body style='font-family:Arial,sans-serif;'>";
$mes .= "<h1 style='font-weight:400;border-bottom:1px dotted #dae5e8;font-size:18px;padding-bottom:8px;color:#5f5f5f;'>Заголовок письма</h1>\r\n";
/***одной строкой, версия v0.1, может быть и не понадобится больше
	$mes .= "Имя: $name\r\nТелефон: $phone\r\nПочта: $email\r\nКомментарий: $companyName\r\nДата: $formDate\r\nТип предприятия: $formType\r\nКоличество сотрудников: $quantity\r\nТип: $formName\r\n";
*/
if (isset($_POST['name']))			{	$mes .= "<p style=\"margin-left:20px;\"><strong>Имя:</strong> ".$name."<br />\r\n";		}
if (isset($_POST['phone']))			{	$mes .= "<strong>Телефон:</strong> ".$phone."<br />\r\n";								}
if (isset($_POST['email']))			{	$mes .= "<strong>Почта:</strong> ".$email."<br />\r\n";									}
if (isset($_POST['companyName']))	{	$mes .= "<strong>Компания:</strong> ".$companyName."<br />\r\n";						}
if (isset($_POST['formDate']))		{	$mes .= "<strong>Дата регистрации:</strong> ".$formDate."<br />\r\n";					}
if (isset($_POST['formType']))		{	$mes .= "<strong>Тип предприятия:</strong> ".$formType."<br />\r\n";					}
if (isset($_POST['quantity']))		{	$mes .= "<strong>Количество сотрудников:</strong> ".$quantity."<br />\r\n";				}
if (isset($_POST['formName']))		{	$mes .= "<strong>Тип заявки с сайта:</strong> ".$formName."</p>\r\n";					}
$mes .= "<p style=\"color:#444;font-size:10px;padding-top:10px;border-top:1px dotted #dae5e8;\">IP: ".$ip."<br />\r\n";
$mes .= "Время отправки заявки: ".$time."<br />\r\n";
$mes .= "Браузер: ".$soft."<br />\r\n";
$mes .= "Откуда пришёл посетитель: ".$url_o."</p>\r\n";
$mes .= "</body></html>";

mail ($address,$sub,$mes,$headers);

$fo=fopen("comments.txt", "a");
fwrite($fo, "
<tr>
 <td>$time</td>
 <td>{$_POST['name']}</td>
 <td><a href=\"tel:{$_POST['phone']}\">{$_POST['phone']}</a></td>
 <td><a href=\"tel:{$_POST['email']}\">{$_POST['email']}</a></td>
 <td>{$_POST['companyName']}</td>
 <td>{$_POST['formDate']}</td>
 <td>{$_POST['formType']}</td>
 <td>{$_POST['quantity']}</td>
 <td>{$_POST['formName']}</td>
</tr>\n");
fclose($fo);
?>
