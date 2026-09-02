const config = require('../config/env');
const whatsappService = require('../services/whatsapp.service');
const aiService = require('../services/ai.service');

// Controlador para manejar los eventos del Webhook de WhatsApp
class WebhookController {
  
  /**
   * Verifica el Webhook (Endpoint GET) requerido por Meta.
   */
  verifyWebhook(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === config.verifyToken) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403); // Forbidden si el token no coincide
      }
    } else {
      res.sendStatus(400); // Bad Request
    }
  }

  /**
   * Recibe y procesa los mensajes entrantes (Endpoint POST).
   */
  async handleIncomingMessage(req, res) {
    const body = req.body;

    // Verificar si es un evento de WhatsApp
    if (body.object === 'whatsapp_business_account') {
      try {
        if (
          body.entry && 
          body.entry[0].changes && 
          body.entry[0].changes[0] && 
          body.entry[0].changes[0].value.messages && 
          body.entry[0].changes[0].value.messages[0]
        ) {
          const message = body.entry[0].changes[0].value.messages[0];
          const from = message.from; // Número de quien envía
          let extractedData = null;

          // Si es mensaje de texto
          if (message.type === 'text') {
            const textContent = message.text.body;
            extractedData = await aiService.extractDataFromText(textContent);
          }
          // Si es nota de voz (audio)
          else if (message.type === 'audio' || message.type === 'voice') {
            const mediaId = message.audio.id;
            const mimeType = message.audio.mime_type;
            
            // 1. Descargar audio
            const filePath = await whatsappService.downloadMedia(mediaId, mimeType);
            
            // 2. Transcribir
            const transcription = await aiService.transcribeAudio(filePath);
            
            // 3. Extraer estructura
            extractedData = await aiService.extractDataFromText(transcription);
            
            // (Opcional) Borrar el archivo local después de procesar
            // fs.unlinkSync(filePath);
          }
          // Si es imagen (factura, etc)
          else if (message.type === 'image') {
            // Nota: Aquí se podría implementar lectura de imágenes (OCR o GPT-4V)
            await whatsappService.sendMessage(from, '📸 Imagen recibida. Por el momento el análisis de facturas está en construcción.');
            return res.sendStatus(200);
          }

          if (extractedData) {
            // TODO: Aquí integrarías la lógica para guardar en MySQL (usando db.query como en tu server.js)
            // Ejemplo: if(extractedData.tipo === 'gasto') { guardarCompra(...) }
            
            console.log('Datos procesados:', extractedData);
            
            // Confirmación al usuario
            const confirmMsg = `🟢 Registro guardado correctamente:\n- Tipo: ${extractedData.tipo}\n- Concepto: ${extractedData.concepto}\n- Monto: $${extractedData.monto || 0}\n- Categoría: ${extractedData.categoria}`;
            await whatsappService.sendMessage(from, confirmMsg);
          } else {
            await whatsappService.sendMessage(from, '⚠️ Lo siento, no pude entender el mensaje o registrar el dato.');
          }
        }
        res.sendStatus(200); // Siempre responder 200 OK a Meta
      } catch (error) {
        console.error('Error procesando webhook:', error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new WebhookController();
