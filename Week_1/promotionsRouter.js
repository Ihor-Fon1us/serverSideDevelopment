const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        res.end('Will send promo')
    })
    .post((req, res, next) => {
        res.end('POST request for promo')
    })
    .put((req, res, next) => {
        res.end('PUT request for promo')
    })
    .delete((req, res, next) => {
        res.end('DELETE request for promo')
    });

router.route('/:promoId')
    .get((req, res, next) => {
        res.end('Will send details of the promo: ' + req.params.promoId);
    })
    .post((req, res, next) => {
        res.end('POST request for the promo: ' + req.params.promoId);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT request for the promo: ' + req.params.promoId);
    })
    .delete((req, res, next) => {
        res.end('DELETE request for the promo: ' + req.params.promoId);
    });

module.exports = router;