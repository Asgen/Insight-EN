<?php
/* Осуществляем проверку вводимых данных и их защиту от враждебных
скриптов */
$name = htmlspecialchars($_POST["name"]);
$surname = htmlspecialchars($_POST["surname"]);
$email = htmlspecialchars($_POST["email"]);
$phone = htmlspecialchars($_POST["phone"]);
$lang = htmlspecialchars($_POST["language"]);
$message = htmlspecialchars($_POST["body"]);
/* Устанавливаем e-mail адресата */
$myemail = "info@insight.ru.net";
$subject = "Письмо с сайта insight.ru.net";
/* Создаем новую переменную, присвоив ей значение */
$message_to_myemail = "Здравствуйте!
Вашей контактной формой было отправлено сообщение!
Имя отправителя: $name
Фамилия отправителя: $surname
E-mail: $email
Phone: $phone
Хочет изучать: $lang
Текст сообщения: $message
Конец";
/* Отправляем сообщение, используя mail() функцию */
$from  = "From: $name <$email> \r\n Reply-To: $email \r\n";
mail($myemail, $subject, $phone, $message_to_myemail, $from);
?>
<p>Ваше сообщение было успешно отправлено!</p>
<p>На <a href="index.php">Главную >>></a></p>
<?php
/* Если при заполнении формы были допущены ошибки сработает
следующий код: */
function check_input($data, $problem = "")
{
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
if ($problem && strlen($data) == 0)
{
show_error($problem);
}
return $data;
}
function show_error($myError)
{
?>
<html>
<body>
<p>Пожалуйста исправьте следующую ошибку:</p>
<?php echo $myError; ?>
</body>
</html>
<?php
exit();
}
?>
