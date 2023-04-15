require('dotenv').config();

const Hapi = require('@hapi/hapi');
const rpm = require('./api/rpm');
const dashboard = require('./api/dashboard');
const PostgresRPMService = require('./services/postgres/RPMService');
const InMemoryRPMService = require('./services/inMemory/RPMService');
const RPMValidator = require('./validator/rpm');

const init = async () => {
  let rpmService;

  try {
    // Try to connect to PostgreSQL
    rpmService = new PostgresRPMService();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error.message);
    console.warn('Falling back to in-memory service');
    rpmService = new InMemoryRPMService();
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

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
