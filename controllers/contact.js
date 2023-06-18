const express = require('express');
const router = express.Router();
const Model = require('../models/contact');

router.get('/', function (req, res, next) {
    var model = new Model();
    var query = req.query
    model.get_list(query)
        .then(function (data) {
            res.status(200).json({
                status: true,
                data: data
            });
        })
        .catch(function (err) {
            return next(err, req, res, next);
        })
})

router.get('/:id', function (req, res, next) {
    var model = new Model();
    var params = req.params;
    model.get_detail(params)
        .then(function (data) {
            res.status(200).json({
                status: true,
                data: data
            });
        })
        .catch(function (err) {
            return next(err, req, res, next);
        })
})

router.post('/', function (req, res, next) {
    var model = new Model();
    var post = req.body;
    model.create(post)
        .then(function (data) {
            res.status(200).json({
                status: true,
                data: data
            });
        })
        .catch(function (err) {
            return next(err, req, res, next);
        })
})

router.put('/:id', function (req, res, next) {
    var model = new Model();
    var post = req.body;
    var params = req.params;
    model.update(params, post)
        .then(function (data) {
            res.status(200).json({
                status: true,
                data: data
            });
        })
        .catch(function (err) {
            return next(err, req, res, next);
        })
})

router.delete('/:id', function (req, res, next) {
    var model = new Model();
    var params = req.params;
    model.delete(params)
        .then(function (data) {
            res.status(200).json({
                status: true,
                data: data
            });
        })
        .catch(function (err) {
            return next(err, req, res, next);
        })
})

module.exports = router;