// Write your "actions" router here!
const express = require('express');

const { validateActionId, validateAction, validateUpdatedAction } = require('./actions-middlware');
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    const noActions = []
    Actions.get()
        .then((actions) => {
        if(actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json(noActions)
        }
        })
        .catch(next)
});

router.get('/:id', validateActionId, (req, res, next) => {
    res.status(200).json(req.action)
});

router.post('/', validateAction, (req, res, next) => {
    const required = req.body
    Actions.insert(required)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
});

router.put('/:id', validateUpdatedAction, (req, res, next) =>  {
    const { id } = req.params;
    const changes = req.body;
    Actions.update(id, changes)
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(next)
});


router.delete('/:id', validateActionId, (req, res, next) => {
    const { id } = req.params;
   Actions.remove(id)
    .then((success) => {
        if(success){
            res.json(success)
        } else{
            res.status(404).json({ message: 'The action has been deleted'})
        }
    })
    .catch(next)
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message, 
        customMessage: 'Something bad inside actions router'
    })
});

module.exports = router;