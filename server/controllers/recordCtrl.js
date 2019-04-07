const express = require('express');
const router = express.Router();

const service = require('./../services/recordService');

router.get('/', (req, res) => {
    const {accountId} = req.query;
    service.getAll(accountId)
        .then(result => res.status(200).send(result))
        .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
    const data = req.body;
    service.create(data)
        .then(result => res.status(200).send(result))
        .catch(() => res.sendStatus(500));
});

router.put('/:id', (req, res) => {
    service.update(req.params.id, req.body)
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

router.delete('/:recordId', (req, res) => {
    service.delete(req.params.recordId)
        .then(result => res.status(202).send(result))
        .catch(() => res.sendStatus(500));
});

module.exports = router;