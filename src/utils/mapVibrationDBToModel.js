const mapVibrationDBToModel = ({ timestamp, device_id, vibration }) => ({
  timestamp,
  deviceId: device_id,
  vibration,
});

module.exports = { mapVibrationDBToModel };
