const VibrationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Vibration',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const vibrationHandler = new VibrationHandler(service, validator);
    server.route(routes(vibrationHandler));
  },
};
