const express = require('express');
const router = express.Router();
const authenticate = require('./authentication');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const Favorite = require('../models/favorite');


router.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorite.find({'postedBy': req.decoded._doc._id})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorites) {
                if (err) return err;
                res.json(favorites);
            });
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        var favorite = new Favorite(req.body);
        favorite.postedBy = req.decoded._doc._id;
        favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, err => next(err))
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorite.remove({})
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }
            , err => next(err))
            .catch(err => next(err));
    });

router.route('/:dishId')
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({'postedBy': req.decoded._doc._id, 'dishes': req.params.dishId})
            .then(favorite => {
                if (favorite) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        message: 'Favorite not found'
                    });
                }
            }
            , err => next(err))
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorite.remove({'postedBy': req.decoded._doc._id, 'dishes': req.params.dishId})
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }
            , err => next(err))
            .catch(err => next(err));
    });