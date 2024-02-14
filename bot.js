/**
 * Bienvenido a la documentación del bot de Telegram.
 *
 * Este bot fue creado para proporcionar funcionalidades básicas y divertidas a través de la plataforma de mensajería Telegram.
 * Ofrece comandos para obtener información, imágenes de gatos, citas aleatorias y datos curiosos sobre gatos.
 *
 * Funciones principales:
 * - Envío de mensajes de bienvenida y menú personalizado al usuario cuando se inicia el bot.
 * - Manejo de comandos para mostrar información, fotos de gatos, citas aleatorias y hechos curiosos sobre gatos.
 * - Integración con diversas APIs para obtener datos actualizados y aleatorios.
 *
 * Esperamos que disfrutes utilizando este bot y que te diviertas con las funcionalidades que ofrece.
 * ¡Gracias por utilizar nuestro servicio!
 */

/**
 * Inicializa el bot de Telegram y define los manejadores de eventos para diferentes comandos.
 */
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Token de acceso para el bot de Telegram
const token = '6631012155:AAG0KWijZv3WOsDnwwxEsWlssXpJoZmiY04';
const bot = new TelegramBot(token, { polling: true });
/**
 * Maneja el comando /start para saludar al usuario y mostrar un menú personalizado.
 */
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

/**
 * Maneja el comando /info para mostrar información sobre los comandos disponibles.
 */
bot.onText(/^⋆⭒˚｡⋆ info$/, (msg) => {
  const chatId = msg.chat.id;
  const response = 'Esta es la información que necesitas: cat photo(manda fotos de gatos), quote(manda la foto del dia), cat fact (da datos sobre gatos) ';
  sendMessage(chatId, response);
});

/**
 * Maneja el comando /catphoto para enviar una foto aleatoria de un gato.
 */
bot.onText(/^ฅ•ﻌ•ฅ cat photo$/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const imageUrl = await getRandomCatImage();
    sendMessage(chatId, imageUrl);
  } catch (error) {
    sendMessage(chatId, 'Lo siento, no pude obtener una imagen de gato en este momento.');
  }
});

/**
 * Maneja el comando /quote para enviar una cita aleatoria.
 */
bot.onText(/^✎ quote$/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const quote = await getRandomQuote();
    sendMessage(chatId, `${quote.content} - ${quote.author}`);
  } catch (error) {
    sendMessage(chatId, 'Lo siento, no pude obtener una cita en este momento.');
  }
});

/**
 * Maneja el comando /catfact para enviar un hecho aleatorio sobre los gatos.
 */
bot.onText(/^₊˚ʚ ᗢ₊˚✧ ﾟ. cat fact$/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const fact = await getRandomCatFact();
    sendMessage(chatId, fact);
  } catch (error) {
    sendMessage(chatId, 'Lo siento, no pude obtener un hecho sobre gatos en este momento.');
  }
});

/**
 * Obtiene una imagen aleatoria de un gato desde la API de TheCatAPI.
 * @returns {Promise<string>} URL de la imagen de gato.
 */
async function getRandomCatImage() {
  const response = await axios.get('https://api.thecatapi.com/v1/images/search');
  return response.data[0].url;
}

/**
 * Obtiene una cita aleatoria desde la API Quotable.
 * @returns {Promise<Object>} Objeto que contiene la cita y el autor.
 */
async function getRandomQuote() {
  const response = await axios.get('https://api.quotable.io/random');
  return response.data;
}

/**
 * Obtiene un hecho aleatorio sobre los gatos desde la API CatFact Ninja.
 * @returns {Promise<string>} Hecho aleatorio sobre los gatos.
 */
async function getRandomCatFact() {
  const response = await axios.get('https://catfact.ninja/fact');
  return response.data.fact;
}

/**
 * Envía un mensaje al chat especificado.
 * @param {number} chatId ID del chat al que se enviará el mensaje.
 * @param {string} response Mensaje que se enviará.
 * @param {Object} [options] Opciones adicionales para enviar el mensaje.
 */
function sendMessage(chatId, response, options = {}) {
  bot.sendMessage(chatId, response, { parse_mode: 'HTML', ...options });
}