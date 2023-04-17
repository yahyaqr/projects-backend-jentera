const { Pool } = require('pg');
const { mapRPMDBToModel } = require('../../utils/mapRPMDBToModel');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class RPMService {
  constructor() {
    this._pool = new Pool();
  }

  async addRPM({ deviceId, rpm }) {
    const timestamp = new Date().toISOString();

    const query = {
      text: "INSERT INTO rpm VALUES(to_timestamp($1, 'YYYY-MM-DDTHH24:MI:SS.MSZ'), $2, $3) RETURNING timestamp",
      values: [timestamp, deviceId, rpm],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].timestamp) {
      throw new InvariantError('RPM gagal ditambahkan');
    }

    return result.rows[0];
  }

  async getRPM() {
    const result = await this._pool.query('SELECT * FROM rpm');
    return result.rows.map(mapRPMDBToModel);
  }

  async getRPMByDeviceId(deviceId) {
    const query = {
      text: 'SELECT timestamp, rpm FROM rpm WHERE device_id = $1',
      values: [deviceId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('RPM tidak ditemukan');
    }

    return result.rows.map(mapRPMDBToModel);
  }

  // async editRPMById(id, { rpm }) {
  //   const updatedAt = new Date().toISOString();
  //   const query = {
  //     text: 'UPDATE rpm SET id = $3, rpm = $1, updated_at = $2 WHERE id = $3 RETURNING id',
  //     values: [rpm, updatedAt, id],
  //   };

  //   const result = await this._pool.query(query);

  //   if (!result.rows.length) {
  //     throw new NotFoundError('Gagal memperbarui RPM. Id tidak ditemukan');
  //   }
  // }

  // async deleteRPMById(id) {
  //   const query = {
  //     text: 'DELETE FROM rpm WHERE id = $1 RETURNING id',
  //     values: [id],
  //   };

  //   const result = await this._pool.query(query);

  //   if (!result.rows.length) {
  //     throw new NotFoundError('RPM gagal dihapus. Id tidak ditemukan');
  //   }
  // }
}

module.exports = RPMService;
