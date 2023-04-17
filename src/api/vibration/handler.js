const ClientError = require('../../exceptions/ClientError');

class VibrationHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postVibrationHandler = this.postVibrationHandler.bind(this);
    this.getVibrationHandler = this.getVibrationHandler.bind(this);
    this.getVibrationByDeviceIdHandler =
      this.getVibrationByDeviceIdHandler.bind(this);
  }

  async postVibrationHandler(request, h) {
    try {
      this._validator.validateVibrationPayload(request.payload);

      const { deviceId, vibration } = request.payload;

      const vibrationData = await this._service.addVibration({
        deviceId,
        vibration,
      });

      const response = h.response({
        status: 'success',
        message: 'Vibration berhasil ditambahkan',
        data: {
          vibrationData,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getVibrationHandler() {
    const vibration = await this._service.getVibration();
    return {
      status: 'success',
      data: {
        vibration,
      },
    };
  }

  async getVibrationByDeviceIdHandler(request, h) {
    try {
      const { deviceId } = request.params;
      const vibration = await this._service.getVibrationByDeviceId(deviceId);

      return {
        status: 'success',
        data: {
          vibration,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = VibrationHandler;
