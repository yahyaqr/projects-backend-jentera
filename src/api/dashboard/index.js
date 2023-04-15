// eslint-disable-next-line import/no-extraneous-dependencies
const Inert = require('@hapi/inert');
const DashboardHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Dashboard',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const dashboardHandler = new DashboardHandler(service, validator);

    // Register the @hapi/inert plugin
    await server.register(Inert);

    server.route(routes(dashboardHandler));
  },
};
