const ClientError = require('../../exceptions/ClientError');

class RPMHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postRPMHandler = this.postRPMHandler.bind(this);
    this.getRPMHandler = this.getRPMHandler.bind(this);
    this.getRPMByDeviceIdHandler = this.getRPMByDeviceIdHandler.bind(this);
    // this.putRPMByIdHandler = this.putRPMByIdHandler.bind(this);
    // this.deleteRPMByIdHandler = this.deleteRPMByIdHandler.bind(this);
  }

  async postRPMHandler(request, h) {
    try {
      this._validator.validateRPMPayload(request.payload);

      const { deviceId, rpm } = request.payload;

      const rpmData = await this._service.addRPM({ deviceId, rpm });

      const response = h.response({
        status: 'success',
        message: 'RPM berhasil ditambahkan',
        data: {
          rpmData,
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

  async getRPMHandler() {
    const rpm = await this._service.getRPM();
    return {
      status: 'success',
      data: {
        rpm,
      },
    };
  }

  async getRPMByDeviceIdHandler(request, h) {
    try {
      const { deviceId } = request.params;
      const rpm = await this._service.getRPMByDeviceId(deviceId);

      return {
        status: 'success',
        data: {
          rpm,
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

  // async putRPMByIdHandler(request, h) {
  //   try {
  //     this._validator.validateRPMPayload(request.payload);
  //     const { rpm } = request.payload;
  //     const { id } = request.params;

  //     await this._service.editRPMById(id, { rpm });

  //     return {
  //       status: 'success',
  //       message: 'RPM berhasil diperbarui',
  //     };
  //   } catch (error) {
  //     if (error instanceof ClientError) {
  //       const response = h.response({
  //         status: 'fail',
  //         message: error.message,
  //       });
  //       response.code(error.statusCode);
  //       return response;
  //     }

  //     // Server ERROR!
  //     const response = h.response({
  //       status: 'error',
  //       message: 'Maaf, terjadi kegagalan pada server kami.',
  //     });
  //     response.code(500);
  //     console.error(error);
  //     return response;
  //   }
  // }

  // async deleteRPMByIdHandler(request, h) {
  //   try {
  //     const { id } = request.params;
  //     await this._service.deleteRPMById(id);

  //     return {
  //       status: 'success',
  //       message: 'RPM berhasil dihapus',
  //     };
  //   } catch (error) {
  //     if (error instanceof ClientError) {
  //       const response = h.response({
  //         status: 'fail',
  //         message: error.message,
  //       });
  //       response.code(error.statusCode);
  //       return response;
  //     }

  //     // Server ERROR!
  //     const response = h.response({
  //       status: 'error',
  //       message: 'Maaf, terjadi kegagalan pada server kami.',
  //     });
  //     response.code(500);
  //     console.error(error);
  //     return response;
  //   }
  // }
}

module.exports = RPMHandler;
