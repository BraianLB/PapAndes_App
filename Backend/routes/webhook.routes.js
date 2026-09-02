const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');

// GET: Verificación de Meta (Webhook Setup)
router.get('/', webhookController.verifyWebhook);

// POST: Recepción de eventos y mensajes
router.post('/', webhookController.handleIncomingMessage);

module.exports = router;
