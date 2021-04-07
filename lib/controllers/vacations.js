const { Router } = require('express');
const Vacations = require('../models/Vacations');
const VacationService = require('../services/VacationService');
const { getImage } = require('../utils/imageAPI');

module.exports = Router()

    .post('/', async (req, res, next) => {
        try {
            const newVaca = await VacationService.new(req.body);
            res.send(newVaca);
        } catch (err) {
            next(err);
        }
    })

    .get('/pic', async (req, res, next) => {
        try {
            const newPic = await getImage(req.body.destination);
            res.send(newPic);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const vac = await Vacations.getById(req.params.id);
            res.send(vac);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const vacs = await Vacations.getAll();
            res.send(vacs);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const updatedVaca = await VacationService.update(req.params.id, req.body);
            res.send(updatedVaca);
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const deletedVaca = await Vacations.delete(req.params.id);
            res.send(deletedVaca);
        } catch (err) {
            next(err);
        }
    })
