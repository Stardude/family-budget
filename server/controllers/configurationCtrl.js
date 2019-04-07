const express = require('express');
const router = express.Router();

const service = require('./../services/configurationService');

router.post('/drop', (req, res) => {
    service.dropDatabase()
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

module.exports = router;