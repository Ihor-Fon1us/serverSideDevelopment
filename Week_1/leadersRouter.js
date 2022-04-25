const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        res.end('Will send leaders')
    })
    .post((req, res, next) => {
        res.end('POST request for leaders')
    })
    .put((req, res, next) => {
        res.end('PUT request for leaders')
    })
    .delete((req, res, next) => {
        res.end('DELETE request for leaders')
    });

router.route('/:leaderId')
    .get((req, res, next) => {
        res.end('Will send details of the leader: ' + req.params.leaderId);
    })
    .post((req, res, next) => {
        res.end('POST request for the leader: ' + req.params.leaderId);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT request for the leader: ' + req.params.leaderId);
    })
    .delete((req, res, next) => {
        res.end('DELETE request for the leader: ' + req.params.leaderId);
    });

module.exports = router;