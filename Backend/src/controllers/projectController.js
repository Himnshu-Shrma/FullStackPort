import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../services/projectService.js';
import AppError from '../utils/AppError.js';

export const getProjects = async (req, res) => {
    const projects = await getAllProjects();
    if (!projects) {
        return new AppError('Projects not found', 404);
    }

    res.status(200).json({
        success: true,
        data: projects,
        count: projects.length
    })
}

export const getProject = async (req, res) => {
    const project = await getProjectById(req.params.id);
    if (!project) {
        return new AppError('Project not found', 404);
    }

    res.status(200).json({
        success: true,
        data: project,

    })
}

export const addProject = async (req, res) => {
    // const { title, description, technologies, githubUrl, liveUrl } = req.body;
    // if (
    //     typeof title !== 'string' || !title.trim() ||
    //     typeof description !== 'string' || !description.trim() ||
    //     !Array.isArray(technologies)
    // ) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Title, description, and technologies are required'
    //     });
    // }
    const newProject = await createProject(req.body);
    res.status(201).json({
        success: true,
        data: newProject
    });
}

export const editProject = async (req, res) => {
    // const id = Number(req.params.id);

    // if (!Number.isSafeInteger(id) || id <= 0) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Project ID must be a positive integer'
    //     });
    // }

    // const allowedFields = [
    //     'title',
    //     'description',
    //     'keyPoints',
    //     'technologies',
    //     'githubUrl',
    //     'liveUrl'
    // ];

    // const updates = {};

    // for (const field of allowedFields) {
    //     if (req.body[field] !== undefined) {
    //         updates[field] = req.body[field];
    //     }
    // }
    // if (Object.keys(updates).length === 0) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Provide at least one valid field to update'
    //     });
    // }

    // if (
    //     ('title' in updates &&
    //         (typeof updates.title !== 'string' || !updates.title.trim())) ||
    //     ('description' in updates &&
    //         (typeof updates.description !== 'string' ||
    //             !updates.description.trim())) ||
    //     ('technologies' in updates &&
    //         (!Array.isArray(updates.technologies) ||
    //             !updates.technologies.every((item) => typeof item === 'string'))) ||
    //     ['githubUrl', 'liveUrl'].some(
    //         (field) =>
    //             field in updates &&
    //             typeof updates[field] !== 'string'
    //     )
    // ) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'One or more project fields have an invalid value'
    //     });
    // }
    // if (typeof updates.title === 'string') {
    //     updates.title = updates.title.trim();
    // }

    // if (typeof updates.description === 'string') {
    //     updates.description = updates.description.trim();
    // }

    const project = await updateProject(req.params.id, req.body);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: 'Project not found'
        });
    }

    res.status(200).json({
        success: true,
        data: project
    });
}

export const removeProject = async (req, res) => {
    const project = await deleteProject(req.params.id);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: 'Project not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
        data: project
    });
};