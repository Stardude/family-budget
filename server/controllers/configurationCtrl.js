const express = require('express');
const router = express.Router();

const service = require('./../services/configurationService');

router.get('/', (req, res) => {
    service.get()
        .then(result => res.status(200).send(result))
        .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
    service.update(req.body)
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

module.exports = router;
