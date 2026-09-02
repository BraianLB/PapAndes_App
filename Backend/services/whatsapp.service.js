const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('../config/env');

/**
 * Servicio para interactuar con la Meta Cloud API de WhatsApp.
 */
class WhatsAppService {
  /**
   * Descarga un archivo multimedia desde WhatsApp usando su Media ID.
   * @param {string} mediaId - El ID del medio de WhatsApp.
   * @param {string} mimeType - El tipo MIME del archivo (para deducir extensión).
   * @returns {Promise<string>} La ruta local donde se guardó el archivo.
   */
  async downloadMedia(mediaId, mimeType) {
    try {
      // 1. Obtener la URL de descarga usando el media ID
      const urlResponse = await axios.get(
        `https://graph.facebook.com/v19.0/${mediaId}`,
        {
          headers: { Authorization: `Bearer ${config.whatsappToken}` }
        }
      );
      
      const mediaUrl = urlResponse.data.url;

      // 2. Descargar el archivo binario
      const mediaResponse = await axios.get(mediaUrl, {
        responseType: 'stream',
        headers: { Authorization: `Bearer ${config.whatsappToken}` }
      });

      // Determinar extensión (simplificado)
      let ext = '.ogg';
      if (mimeType.includes('image/jpeg')) ext = '.jpg';
      else if (mimeType.includes('image/png')) ext = '.png';

      const fileName = `media_${mediaId}_${Date.now()}${ext}`;
      const uploadsDir = path.join(__dirname, '../public/uploads/whatsapp');
      
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, fileName);
      const writer = fs.createWriteStream(filePath);

      mediaResponse.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Error al descargar media de WhatsApp:', error.message);
      throw new Error('Fallo al descargar media de WhatsApp');
    }
  }

  /**
   * Envía un mensaje de texto al usuario a través de WhatsApp.
   * @param {string} to - Número de teléfono del destinatario.
   * @param {string} text - Contenido del mensaje.
   */
  async sendMessage(to, text) {
    try {
      await axios.post(
        `https://graph.facebook.com/v19.0/${config.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: { body: text }
        },
        {
          headers: {
            Authorization: `Bearer ${config.whatsappToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error('Error enviando mensaje de WhatsApp:', error.response?.data || error.message);
      throw new Error('Fallo al enviar mensaje');
    }
  }
}

module.exports = new WhatsAppService();
