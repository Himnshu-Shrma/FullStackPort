
import express from 'express';

import {
    getProjects,
    getProject,
    addProject,
    editProject,
    removeProject
} from '../controllers/projectController.js';

const projectsRoutes = express.Router();

projectsRoutes.get('/', getProjects);
projectsRoutes.get('/:id', getProject);
projectsRoutes.post('/', addProject);
projectsRoutes.patch('/:id', editProject);
projectsRoutes.delete('/:id', removeProject);

export default projectsRoutes;