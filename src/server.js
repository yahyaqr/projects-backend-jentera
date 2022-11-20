const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 8100,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Accept-language'],
        additionalHeaders: ['Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization'],
        credentials: true,
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();
