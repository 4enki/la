<?php
  if (isset($_POST['formName'])) {$name = $_POST['formName'];}
  if (isset($_POST['formContact'])) {$contacnt = $_POST['formContact'];}
  if (isset($_POST['formZipfrom'])) {$zipfrom = $_POST['formZipfrom'];}
  if (isset($_POST['formZipto'])) {$zipto = $_POST['formZipto'];}
  if (isset($_POST['formType'])) {$nameform = $_POST['formType'];}
  if (isset($_POST['formMessage'])) {$message = $_POST['formMessage'];}

  $ip = getenv(REMOTE_ADDR);
  $time = date("H:i:s d M Y");
  $soft = getenv(HTTP_USER_AGENT);
  $url_o = getenv(HTTP_REFERER);

  $sub = "=?utf-8?b?".base64_encode("+1 LA Moving Centre")."?="; // тема письма, принудительно в ЮТФ-8

  $address = "yaglazov@gmail.com"; // кому отправляется письмо, указание адресатов через запятую — сработает

  $headers  = "From: " . strip_tags($email) . "\r\n";
  $headers .= "Reply-To: ". strip_tags($email) . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html;charset=utf-8 \r\n"; // чтобы всё пришло в правильной кодировке!

  $mes  = "<html><body style='font-family:Arial,sans-serif;'>";
  $mes .= "<h1 style='font-weight:400;border-bottom:1px dotted #f3f3f3;font-size:22px;padding-bottom:8px;color:#0e496f;'>+1 LA Moving Centre</h1>\r\n";
    if (isset($_POST['formName']))    {$mes .= "<p style=\"margin-left:20px;font-size:14px;\"><strong>Full name:</strong> ".$name."<br />\r\n";}
    if (isset($_POST['formContact'])) {$mes .= "<strong>Phone or email:</strong> ".$contacnt."<br />\r\n";}
    if (isset($_POST['formZipfrom'])) {$mes .= "<strong>Zipe code from:</strong> ".$zipfrom."<br />\r\n";}
    if (isset($_POST['formZipto']))   {$mes .= "<strong>Zipe code to:</strong> ".$zipto."<br />\r\n";}
    if (isset($_POST['formMessage'])) {$mes .= "<strong>Message:</strong> ".$message."<br />\r\n";}
    if (isset($_POST['formType']))    {$mes .= "<strong>Form Type:</strong> ".$nameform."</p>\r\n";}
  $mes .= "<p style=\"color:#336f96;font-size:11px;padding-top:12px;border-top:1px dotted #f3f3f3;\">IP: ".$ip."<br />\r\n";
  $mes .= "Sending time: ".$time."<br />\r\n";
  $mes .= "Browser: ".$soft."<br />\r\n";
  $mes .= "Referrer: ".$url_o."</p>\r\n";
  $mes .= "</body></html>";
  mail ($address,$sub,$mes,$headers);

  // Записать данные из формы в файл
  $fo=fopen("messforms.txt", "a");
  fwrite($fo, "
  <tr>
   <td>$time</td>
   <td>{$_POST['formName']}</td>
   <td>{$_POST['formContact']}</td>
   <td>{$_POST['formZipfrom']}</td>
   <td>{$_POST['formZipto']}</td>
   <td>{$_POST['formMessage']}</td>
   <td>{$_POST['formType']}</td>
  </tr>\n");
  fclose($fo);
?>
