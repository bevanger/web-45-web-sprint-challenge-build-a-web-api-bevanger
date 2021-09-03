// add middlewares here related to actions
const Actions = require('./actions-model');

function validateActionId(req, res, next) {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if(action) {
                req.action = action
                next()
            } else {
                next({ message: 'Action not found', status: 404 })
            }
        })
        .catch(next)
}

function validateAction(req, res, next) {
    if(!req.body.notes || !req.body.description || !req.body.project_id) { 
        next({ message: 'Missing notes, description or project_id', status: 400 })
    } else {
        next()
    }
}

function validateUpdatedAction(req, res, next) {
    if(!req.body.notes || !req.body.description || !req.body.project_id) {
        next({ message: 'missing name, description,completed or project_id field', status: 400})
    } else {
        next()
    }
}

module.exports = { validateActionId, validateAction, validateUpdatedAction };