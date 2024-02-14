const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6631012155:AAG0KWijZv3WOsDnwwxEsWlssXpJoZmiY04';
const bot = new TelegramBot(token, { polling: true });
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;
  const response = '¡Hola ૮ ˶ᵔ ᵕ ᵔ˶ ა! presiona el botón de la derecha para ver el menú';
  const keyboard = {
    reply_markup: {
      keyboard: [['⋆⭒˚｡⋆ info', 'ฅ•ﻌ•ฅ cat photo', '✎ quote'], ['₊˚ʚ ᗢ₊˚✧ ﾟ. cat fact']],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
  sendMessage(chatId, response, keyboard);
});

bot.onText(/^⋆⭒˚｡⋆ info$/, (msg) => {
  const chatId = msg.chat.id;
  const response = 'Esta es la información que necesitas.';
  sendMessage(chatId, response);
});

bot.onText(/^ฅ•ﻌ•ฅ cat photo$/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const imageUrl = await getRandomCatImage();
    sendMessage(chatId, imageUrl);
  } catch (error) {
    sendMessage(chatId, 'Lo siento, no pude obtener una imagen de gato en este momento.');
  }
});

bot.onText(/^✎ quote$/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const quote = await getRandomQuote();
    sendMessage(chatId, `${quote.content} - ${quote.author}`);
  } catch (error) {
    sendMessage(chatId, 'Lo siento, no pude obtener una cita en este momento.');
  }
});

bot.onText(/^₊˚ʚ ᗢ₊˚✧ ﾟ. cat fact$/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const fact = await getRandomCatFact();
    sendMessage(chatId, fact);
  } catch (error) {
    sendMessage(chatId, 'Lo siento, no pude obtener un hecho sobre gatos en este momento.');
  }
});

async function getRandomCatImage() {
  const response = await axios.get('https://api.thecatapi.com/v1/images/search');
  return response.data[0].url;
}

async function getRandomQuote() {
  const response = await axios.get('https://api.quotable.io/random');
  return response.data;
}

async function getRandomCatFact() {
  const response = await axios.get('https://catfact.ninja/fact');
  return response.data.fact;
}

function sendMessage(chatId, response, options = {}) {
  bot.sendMessage(chatId, response, { parse_mode: 'HTML', ...options });
}