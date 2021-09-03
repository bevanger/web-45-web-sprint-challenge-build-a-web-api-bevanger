// add middlewares here related to projects
const e = require('express');
const { NotificationCenter } = require('node-notifier');
const Projects = require('./projects-model');

function validateProjectID(req, res, next) {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if(project) {
                req.project = project
                next()
            } else {
                next({ message: 'Project not found', status: 404 })
            }
        })
        .catch(next)
}

function validateProject(req, res, next) {
    if(!req.body.name || !req.body.description) { 
        next({ message: 'missing name or description field', status: 400 })
    } else {
        next()
    }
}

function validateUpdatedProject(req, res, next) {
    if(!req.body.name || !req.body.description || !req.body.completed) {
        next({ message: 'missing name, description, or completed field', status: 400})
    } else {
        next()
    }
}

module.exports = { validateProjectID, validateProject, validateUpdatedProject };