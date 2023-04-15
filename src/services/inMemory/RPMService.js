const InvariantError = require('../../exceptions/InvariantError');
// const NotFoundError = require('../../exceptions/NotFoundError');

class RPMService {
  constructor() {
    this._rpm = [];
  }

  addRPM({ deviceId, rpm }) {
    const timestamp = new Date().toISOString();

    const newRPM = {
      timestamp,
      deviceId,
      rpm,
    };

    this._rpm.push(newRPM);

    const isSuccess =
      this._rpm.filter((data) => data.timestamp === timestamp).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Data gagal ditambahkan');
    }

    return newRPM;
  }

  getRPM() {
    return this._rpm;
  }

  // getRPMById(id) {
  //   const data = this._rpm.filter((n) => n.id === id)[0];
  //   if (!data) {
  //     throw new NotFoundError('Data tidak ditemukan');
  //   }
  //   return data;
  // }

  // editRPMById(id, { rpm }) {
  //   const index = this._rpm.findIndex((data) => data.id === id);

  //   if (index === -1) {
  //     throw new NotFoundError('Gagal memperbarui data. Id tidak ditemukan');
  //   }

  //   const updatedAt = new Date().toISOString();

  //   this._rpm[index] = {
  //     ...this._rpm[index],
  //     rpm,
  //     updatedAt,
  //   };
  // }

  // deleteRPMById(id) {
  //   const index = this._rpm.findIndex((data) => data.id === id);
  //   if (index === -1) {
  //     throw new NotFoundError('Data gagal dihapus. Id tidak ditemukan');
  //   }
  //   this._rpm.splice(index, 1);
  // }
}

module.exports = RPMService;
