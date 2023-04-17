const InvariantError = require('../../exceptions/InvariantError');
// const NotFoundError = require('../../exceptions/NotFoundError');

class VibrationService {
  constructor() {
    this._vibration = [];
  }

  addVibration({ deviceId, vibration }) {
    const timestamp = new Date().toISOString();

    const newVibration = {
      timestamp,
      deviceId,
      vibration,
    };

    this._vibration.push(newVibration);

    const isSuccess =
      this._vibration.filter((data) => data.timestamp === timestamp).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Data gagal ditambahkan');
    }

    return newVibration;
  }

  getVibration() {
    return this._vibration;
  }
}

module.exports = VibrationService;
