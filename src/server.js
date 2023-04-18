require('dotenv').config();

const Hapi = require('@hapi/hapi');
const dashboard = require('./api/dashboard');

const rpm = require('./api/rpm');
const PostgresRPMService = require('./services/postgres/RPMService');
const InMemoryRPMService = require('./services/inMemory/RPMService');
const RPMValidator = require('./validator/rpm');

const vibration = require('./api/vibration');
const PostgresVibrationService = require('./services/postgres/VibrationService');
const InMemoryVibrationService = require('./services/inMemory/VibrationService');
const VibrationValidator = require('./validator/vibration');

const init = async () => {
  let rpmService;
  let vibrationService;

  try {
    // Try to connect to PostgreSQL
    rpmService = new PostgresRPMService();
    vibrationService = new PostgresVibrationService();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error.message);
    console.warn('Falling back to in-memory service');
    rpmService = new InMemoryRPMService();
    vibrationService = new InMemoryVibrationService();
  }

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: dashboard,
  });

  await server.register({
    plugin: rpm,
    options: {
      service: rpmService,
      validator: RPMValidator,
    },
  });

  await server.register({
    plugin: vibration,
    options: {
      service: vibrationService,
      validator: VibrationValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
