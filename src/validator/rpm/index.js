const { RPMPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const RPMValidator = {
  validateRPMPayload: (payload) => {
    const validationResult = RPMPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = RPMValidator;
