const RPMHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'RPM',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const rpmHandler = new RPMHandler(service, validator);
    server.route(routes(rpmHandler));
  },
};
