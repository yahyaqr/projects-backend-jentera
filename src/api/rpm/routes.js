const routes = (handler) => [
  {
    method: 'POST',
    path: '/data/RPM',
    handler: handler.postRPMHandler,
  },
  {
    method: 'GET',
    path: '/data/RPM',
    handler: handler.getRPMHandler,
  },
  {
    method: 'GET',
    path: '/data/RPM/{deviceId}',
    handler: handler.getRPMByDeviceIdHandler,
  },
  // {
  //   method: 'PUT',
  //   path: '/data/RPM/{id}',
  //   handler: handler.putRPMByIdHandler,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/data/RPM/{id}',
  //   handler: handler.deleteRPMByIdHandler,
  // },
];

module.exports = routes;
