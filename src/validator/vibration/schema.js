const Joi = require('joi');

const VibrationPayloadSchema = Joi.object({
  deviceId: Joi.string().required(),
  vibration: Joi.string().required(),
});

module.exports = { VibrationPayloadSchema };
