// Write your "projects" router here!
const express = require('express');

const { validateProjectID, validateProject, validateUpdatedProject } = require('./projects-middleware');
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

router.post('/', validateProject, (req, res, next) => {
    const required = req.body
    Projects.insert(required)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
});

router.put('/:id', validateProjectID, validateUpdatedProject, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    Projects.update(id, changes)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        })
        .catch(next)
});

router.delete('/:id', validateProjectID, (req, res, next) => {
   const { id } = req.params;
   Projects.remove(id)
    .then((success) => {
        if(success){
            res.status(200)
        } else{
            res.status(404).json({ message: 'The project has been deleted'})
        }
    })
    .catch(next)
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