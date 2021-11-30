const express = require('express');

const app = express();

const { serverRenderer } = require('../built/js/serverRenderer');

app.use(express.static('built'));
app.use(serverRenderer());

module.exports = app;