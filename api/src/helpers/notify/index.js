const socketIO = require('../socketIO');
const { notificationType } = require('../../../constants');

const getChannelName = (typeReceiver, receiver) => {
  const { user: USER, profile: PROFILE } = notificationType;

  let channelName = `${PROFILE}_${receiver}`;
  if (typeReceiver === USER) {
    channelName = `${USER}_${receiver}`;
  }

  return channelName;
};

const emitNotify = async (notifyData) => {
  try {
    if (notifyData && notifyData.typeReceiver !== 'all') {
      const { typeReceiver, receiver } = notifyData;
      const channelName = getChannelName(typeReceiver, receiver);
      socketIO().to(channelName).emit('notify', notifyData);
    } else {
      socketIO().sockets.emit('notify', notifyData);
      console.log('Send message to all connection users');
    }
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  emitNotify,
};
