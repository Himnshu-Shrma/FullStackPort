
import express from 'express';
import validate from '../middlewares/validate.js';
import { projectCreationSchema, projectIdSchema, projectUpdationSchema} from '../validators/projectValidators.js';
import requireAdmin from '../middlewares/requireAdmin.js';
import {
    getProjects,
    getProject,
    addProject,
    editProject,
    removeProject
} from '../controllers/projectController.js';

const projectsRoutes = express.Router();

projectsRoutes.get('/', getProjects);
projectsRoutes.get('/:id', validate(projectIdSchema, 'params'), getProject);
projectsRoutes.post('/',requireAdmin, validate(projectCreationSchema), addProject);
projectsRoutes.patch('/:id',requireAdmin, validate(projectIdSchema, 'params'), validate(projectUpdationSchema), editProject);
projectsRoutes.delete('/:id',requireAdmin, validate(projectIdSchema, 'params'), removeProject);

export default projectsRoutes;

// Notice the order for PATCH:

// Validate the ID.

// Validate the body.

// Run the controller.