const express = require('express');
const router = express.Router();

const configurationService = require('./../services/configurationService');
const currencyRateService = require('./../services/currencyRateService');

router.get('/', (req, res) => {
    configurationService.get()
        .then(result => res.status(200).send(result))
        .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
    configurationService.update(req.body)
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

router.post('/update-rates', (req, res) => {
    currencyRateService.updateCurrencyRate(true)
        .then(configurationService.get)
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

module.exports = router;
