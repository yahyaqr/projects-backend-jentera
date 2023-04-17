const { VibrationPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const VibrationValidator = {
  validateVibrationPayload: (payload) => {
    const validationResult = VibrationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = VibrationValidator;
