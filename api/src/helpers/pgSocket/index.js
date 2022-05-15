const pg = require('pg');
const { notificationType } = require('../../../constants');

const getChannelName = (eventData) => {
  const { user: USER, profile: PROFILE } = notificationType;
  const { typeReceiver, receiver } = eventData;

  let channelName = `${PROFILE}_${receiver}`;
  if (typeReceiver === USER) {
    channelName = `${USER}_${receiver}`;
  }

  return channelName;
};

module.exports = (io) => {
  const pgClient = new pg.Client(process.env.POSTGRES_URL);

  pgClient.connect().catch((e) => {
    console.error('Error conecting pg client: ', e);
  });

  pgClient.query('LISTEN addedrecord');

  pgClient.on('notification', async function (resp) {
    const payload = JSON.parse(resp.payload);
    if (payload && payload.data && payload.data.typeReceiver !== 'all') {
      const channelName = getChannelName(payload.data);
      io.to(channelName).emit('notify', payload.data);
    } else {
      io.sockets.emit('notify', payload.data);
      console.log('Send message to all connection users');
    }
  });
};
