const routes = (handler) => [
  {
    method: 'POST',
    path: '/data/vibration',
    handler: handler.postVibrationHandler,
  },
  {
    method: 'GET',
    path: '/data/vibration',
    handler: handler.getVibrationHandler,
  },
  {
    method: 'GET',
    path: '/data/vibration/{deviceId}',
    handler: handler.getVibrationByDeviceIdHandler,
  },
];

module.exports = routes;
