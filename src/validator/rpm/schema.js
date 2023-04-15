const Joi = require('joi');

const RPMPayloadSchema = Joi.object({
  deviceId: Joi.string().required(),
  rpm: Joi.string().required(),
});

module.exports = { RPMPayloadSchema };
