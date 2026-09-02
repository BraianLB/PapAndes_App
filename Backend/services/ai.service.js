const fs = require('fs');
const OpenAI = require('openai');
const config = require('../config/env');

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Servicio para procesar IA: Audio a texto y Extracción estructurada.
 */
class AIService {
  /**
   * Convierte un archivo de audio (.ogg) a texto usando Whisper.
   * @param {string} filePath - Ruta del archivo de audio local.
   * @returns {Promise<string>} La transcripción del audio.
   */
  async transcribeAudio(filePath) {
    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: 'whisper-1',
        language: 'es', // Forzamos español para mejor precisión
      });
      return transcription.text;
    } catch (error) {
      console.error('Error al transcribir audio con Whisper:', error.message);
      throw new Error('Fallo al transcribir el audio');
    }
  }

  /**
   * Usa un LLM para extraer la información estructurada del texto.
   * @param {string} text - Texto transcrito o mensaje del usuario.
   * @returns {Promise<Object>} JSON estructurado con {tipo, categoria, monto, concepto}.
   */
  async extractDataFromText(text) {
    try {
      const prompt = `
Eres un asistente financiero experto para agricultores. Tu objetivo es analizar el texto proporcionado y extraer la información en un formato JSON estricto.

Reglas:
1. El output debe ser ÚNICAMENTE un objeto JSON, sin formato markdown ni texto adicional.
2. Formato esperado:
{
  "tipo": "gasto" | "ingreso" | "nota",
  "categoria": "string (ej: insumos, mano de obra, maquinaria, venta, otros)",
  "monto": number | null (si no se menciona cantidad, pon null),
  "concepto": "string (resumen muy breve de lo que trata)"
}

Texto a analizar:
"${text}"
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Modelo rápido y eficiente
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.1,
      });

      const result = JSON.parse(response.choices[0].message.content);
      return result;
    } catch (error) {
      console.error('Error al extraer datos con OpenAI:', error.message);
      throw new Error('Fallo al extraer datos estructurados');
    }
  }
}

module.exports = new AIService();
