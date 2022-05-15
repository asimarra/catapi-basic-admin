const { notificationType } = require('../../../constants');
let ioInstance = null;

const joinGroups = (socket, dni, idProfile) => {
  socket.join(`${notificationType.user}_${dni.toString()}`);
  socket.join(`${notificationType.profile}_${idProfile.toString()}`);
};

module.exports = (app) => {
  if (ioInstance) {
    console.log('io instance from cache');
    return ioInstance;
  }

  const server = require('http').Server(app);

  const SOCKET_PORT = process.env.SOCKET_PORT || 5000;

  server.listen(SOCKET_PORT, () => {
    console.log(`>> Socket is ready and listening on port: ${SOCKET_PORT}`);
  });

  ioInstance = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  ioInstance.on('connection', (socket) => {
    console.log('a user connected ', socket.id);

    if (socket.handshake.query.idUser) {
      const { idUser, idProfile } = socket.handshake.query;
      joinGroups(socket, idUser, idProfile);
    }

    socket.on('logged-in', async function (dni, idProfile) {
      joinGroups(socket, dni, idProfile);
    });
  });

  console.log('new io instance');
  return ioInstance;
};
