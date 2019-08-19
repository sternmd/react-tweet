require('dotenv').config({ path: __dirname + '/../../.env' });

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const server = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');

const io = require('socket.io')(server);
const Twitter = require('twitter');

// server setup
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// twitter config
let twitter = new Twitter({
  consumer_key: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET
});

let socketConnection;
let twitterStream;

app.locals.searchTerm = 'Javascript'; //Default search term for twitter stream.
app.locals.showRetweets = false; //Default

/**
 * Resumes twitter stream.
 */
const stream = () => {
  console.log('Resuming for ' + app.locals.searchTerm);
  twitter.stream(
    'statuses/filter',
    { track: app.locals.searchTerm },
    stream => {
      stream.on('data', tweet => {
        sendMessage(tweet);
      });

      stream.on('error', error => {
        console.log(error);
      });

      twitterStream = stream;
    }
  );
};

/**
 * Sets search term for twitter stream.
 */
app.post('/setSearchTerm', (req, res) => {
  let term = req.body.term;
  app.locals.searchTerm = term;
  twitterStream.destroy();
  stream();
});

//Establishes socket connection.
io.on('connection', socket => {
  socketConnection = socket;
  stream();
  socket.on('connection', () => console.log('Client connected'));
  socket.on('disconnect', () => console.log('Client disconnected'));
});

/**
 * Emits data from stream.
 * @param {String} msg
 */
const sendMessage = msg => {
  if (msg.text.includes('RT')) {
    return;
  }
  socketConnection.emit('tweets', msg);
};
