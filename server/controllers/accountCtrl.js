const express = require('express');
const router = express.Router();

const service = require('./../services/accountService');

router.get('/', (req, res) => {
    service.getAllAndSynchronizeBalance()
        .then(result => res.status(200).send(result))
        .catch(() => res.sendStatus(500));
});

router.get('/:name', (req, res) => {
    if (req.method === 'HEAD') {
        service.getOneByName(req.params.name)
            .then(result => result ? res.sendStatus(409) : res.sendStatus(200))
            .catch(() => res.sendStatus(500));
    } else {
        service.getOneByName(req.params.name)
            .then(result => res.status(200).send(result))
            .catch(() => res.sendStatus(500));
    }
});

router.post('/', (req, res) => {
    service.create(req.body)
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

router.post('/transfer', (req, res) => {
    service.transfer(req.body)
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

router.put('/:id', (req, res) => {
    service.updateAndGet(req.params.id, req.body)
        .then(result => res.status(201).send(result))
        .catch(() => res.sendStatus(500));
});

router.delete('/:id', (req, res) => {
    service.delete(req.params.id)
        .then(result => res.status(202).send(result))
        .catch(() => res.sendStatus(500));
});

module.exports = router;