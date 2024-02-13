<?php
$token = '6631012155:AAG0KWijZv3WOsDnwwxEsWlssXpJoZmiY04';
$website ='https://api.telegram.org/bot'.$token;

$input = file_get_contents('php://input');
$update = json_decode($input, TRUE);

$chatId = $update['message']['chat']['id']; //para obtener cosas de la web
$message = $update['message']['text'];

switch ($message) {
    case '/start':
        $response = 'ola';
        sendMessage($chatId, $response);
        break;

    case '/info':
        $response = 'esta es la info';
        sendMessage($chatId, $response);
        break;
    
    default:
        $response = 'no entiendo';
        sendMessage($chatId, $response);
        break;
}

function sendMessage($chatId, $response) {
    $url = $GLOBALS['website'].'/sendMessage?chat_id='.$chatId.'&parse_mode=HTML&text='.urlencode($response);
    file_get_contents($url);
}

?>