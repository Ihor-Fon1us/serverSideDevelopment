const express = require('express');
const router = express.Router();

router.route('/:dishId')
    .get((req, res, next) => {
        res.end('Will send details of the dish: ' + req.params.dishId);
    })
    .post((req, res, next) => {
        res.end('POST request for the dish: ' + req.params.dishId);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT request for the dish: ' + req.params.dishId);
    })
    .delete((req, res, next) => {
        res.end('DELETE request for the dish: ' + req.params.dishId);
    });

module.exports = router;