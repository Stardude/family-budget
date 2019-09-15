const express = require('express');
const config = require('config');

const routing = require('./routing');
const middlewares = require('./middlewares');

const { updateCurrencyRate } = require('./services/currencyRateService');

const app  = express();
const PORT = config.port;

middlewares(app);
routing(app);
middlewares.loadStatic(app);
require('./db/db').connect();

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
    setTimeout(updateCurrencyRate, 10000);
});