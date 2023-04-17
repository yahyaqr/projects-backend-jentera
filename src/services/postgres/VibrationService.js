const { Pool } = require('pg');
const { mapVibrationDBToModel } = require('../../utils/mapVibrationDBToModel');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class VibrationService {
  constructor() {
    this._pool = new Pool();
  }

  async addVibration({ deviceId, vibration }) {
    const timestamp = new Date().toISOString();

    const query = {
      text: "INSERT INTO vibration VALUES(to_timestamp($1, 'YYYY-MM-DDTHH24:MI:SS.MSZ'), $2, $3) RETURNING timestamp",
      values: [timestamp, deviceId, vibration],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].timestamp) {
      throw new InvariantError('Vibration gagal ditambahkan');
    }

    return result.rows[0];
  }

  async getVibration() {
    const result = await this._pool.query('SELECT * FROM vibration');
    return result.rows.map(mapVibrationDBToModel);
  }

  async getVibrationByDeviceId(deviceId) {
    const query = {
      text: 'SELECT timestamp, vibration FROM vibration WHERE device_id = $1',
      values: [deviceId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Vibration tidak ditemukan');
    }

    return result.rows.map(mapVibrationDBToModel);
  }
}

module.exports = VibrationService;
