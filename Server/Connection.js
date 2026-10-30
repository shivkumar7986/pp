const mongoose = require('mongoose');

const username = 'developerscorpio';
const password = '0hoXcQnx7l1CSb1C';
const cluster = 'cmsezee.3q47j.mongodb.net';
const database = 'cms_ezee';

const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority&appName=CMSEzee`;
// console.log(mongoURI);
const serverConnection = mongoose.connect(mongoURI);

serverConnection
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

module.exports = serverConnection;