const express = require('express');
const app = express();

const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../../.env' });

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
