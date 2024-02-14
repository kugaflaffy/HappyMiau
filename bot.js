const TelegramBot = require('node-telegram-bot-api');

const token = '6631012155:AAG0KWijZv3WOsDnwwxEsWlssXpJoZmiY04';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const response = 'ola';
  sendMessage(chatId, response);
});

bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
  const response = 'esta es la info';
  sendMessage(chatId, response);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const response = 'no entiendo';
  sendMessage(chatId, response);
});

function sendMessage(chatId, response) {
  bot.sendMessage(chatId, response, { parse_mode: 'HTML' });
}
