// app.js
var express = require('express');
var cors = require('cors');
var app = express();
var WineSpiritController = require('./WineSpirit/WineSpiritController');
app.use('/api/winespirits', WineSpiritController);
app.use(cors());
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });
module.exports = app;