const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');

const io = require('socket.io')(http);
const Twitter = require('twitter');

// twitter config
let twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

require('dotenv').config({ path: '../../.env' });

// middleware
app.use(bodyParser.json());

// start node server
http.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

// establish socket connection
io.on('connection', socket => {
  stream();
  socket.on('connection', () => console.log('client connected'));
  socket.on('disconnect', () => console.log('client disconnected'));
});

// listen to the twitter stream and tweet comes in send it to the client real time
const stream = () => {
  twitter.stream('statuses/filter', { track: 'searchterm' }, stream => {
    stream.on('data', data => {
      io.sockets.emit('tweet', data);
      console.log(data.text);
    });
  });
};
