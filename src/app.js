const express = require('express');
const bodyParse = require('body-parser');
require('dotenv').config();

// App
const app = express();

app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(bodyParse.json());

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

module.exports = app;