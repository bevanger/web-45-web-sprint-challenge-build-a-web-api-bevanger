// Write your "actions" router here!
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Returns an array of actions (or an empty array) as the body of the response' })
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({ message: 'Returns an action with the given `id` as the body of the response' })
});

router.post('/', (req, res, next) => {
    res.status(200).json({ message: 'Returns the newly created action as the body of the response' })
});

router.put('/:id', (req, res, next) =>  {
    res.status(200).json({ message: 'Returns the updated action as the body of the response'})
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({ message: 'Returns no response body'})
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message, 
        customMessage: 'Something bad inside actions router'
    })
});

module.exports = router;