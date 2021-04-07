const { Router } = require('express');
const Vacations = require('../models/Vacations');

module.exports = Router()

    .post('/', async (req, res, next) => {
        try {
            const newVaca = await Vacations.insert(req.body);
            res.send(newVaca);
        } catch (err) {
            next(err);
        }
    })
