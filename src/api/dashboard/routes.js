const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getDashboard, // Fix the method name
  },
];

module.exports = routes;
