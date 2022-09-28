require('dotenv').config();
const Server = require('./data/models/server');

const server = new Server();

server.listen();