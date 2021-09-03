// Write your "projects" router here!
const express = require('express');

const { validateProjectID } = require('./projects-middleware');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get('/:id', validateProjectID, (req, res, next) => {
    res.status(200).json(req.project)
});

router.post('/', (req, res, next) => {
    res.status(200).json({ message: 'Returns the newly created project as the body of the response'})
});

router.put('/:id', (req, res, next) => {
    res.status(200).json({ message: 'Returns the updated project as the body of the response' })
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({ message: 'Returns no response body' })
});

router.get('/:id/actions', (req, res, next) => {
    res.status(200).json({ message: 'Returns an array of actions (could be empty) belonging to a project with the given `id`'})
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message, 
        customMessage: 'Something bad inside projects router'
    })
});

module.exports = router;