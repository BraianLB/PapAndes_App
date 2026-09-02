require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  whatsappToken: process.env.WHATSAPP_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  phoneNumberId: process.env.PHONE_NUMBER_ID,
  openaiApiKey: process.env.OPENAI_API_KEY,
};
