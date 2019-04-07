const express = require('express');
const config = require('config');

const routing = require('./routing');
const middlewares = require('./middlewares');
const db = require('./db/db');

const app  = express();
const PORT = config.port;

middlewares(app);
routing(app);
middlewares.loadStatic(app);
db.connect();

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
});