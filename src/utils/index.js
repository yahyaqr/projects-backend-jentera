const mapDBToModel = ({ timestamp, device_id, rpm }) => ({
  timestamp,
  deviceId: device_id,
  rpm,
});

module.exports = { mapDBToModel };
