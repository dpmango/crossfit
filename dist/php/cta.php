<?php
  $errors         = array();      // array to hold validation errors
  $data           = array();      // array to pass back data
  // validate the variables ======================================================
  // if any of these variables don't exist, add an error to our $errors array
  if (empty($_POST['name']))
      $errors['name'] = 'Name is required.';
  if (empty($_POST['tel']))
      $errors['tel'] = 'Phone is required.';

  // return a response ===========================================================
  // if there are any errors in our errors array, return a success boolean of false
  if ( ! empty($errors)) {
    // if there are items in our errors array, return those errors
    $data['success'] = false;
    $data['errors']  = $errors;
  } else {
    $email_to = "xs290@me.com";
    $email_subject = "Запрос сайта crossfit";
    $email_message = "Запрос на прайс с сайта.\n\n";
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
    $email_message .= "Имя: ".clean_string($_POST['name'])."\n";
    $email_message .= "Телефон: ".clean_string($_POST['phone'])."\n"
    $email_message .= "Email: ".clean_string($_POST['email'])."\n";
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
    // show a message of success and provide a true success variable
    $data['success'] = true;
    $data['message'] = 'Спасибо! Ваша заявку успешно отправлена';
  }
  // return all our data to an AJAX call
  echo json_encode($data);
