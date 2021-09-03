// add middlewares here related to projects
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

module.exports = { validateProjectID };