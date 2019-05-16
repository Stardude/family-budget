const express = require('express');
const router = express.Router();

const service = require('./../services/recordService');

router.get('/', (req, res) => {
    service.getAll(req.query)
        .then(result => res.status(200).send(result))
        .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
    service.createAndGet(req.body)
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