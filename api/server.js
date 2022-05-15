require('dotenv').config();
const app = require('./app');
const socketIO = require('./src/helpers/socketIO');
const pgSocket = require('./src/helpers/pgSocket');

const API_PORT = process.env.API_PORT || 3000;

app.set('port', API_PORT);

// Create HTTP server.
app.listen(API_PORT, () => {
  console.log(`>> Express ready and listening on port: ${API_PORT}`);
});

// Create socket server.
socketIO(app);

// Create listening to postgres' events
// pgSocket(io);
