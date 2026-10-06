import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../services/projectService.js';

export const getProjects = (req, res) => {
    const projects = getAllProjects();
    if (!projects) {
        return res.status(404).json({ success: false, message: 'No projects found' });
    }

    res.status(200).json({
        success: true,
        data: projects,
        count: projects.length,

    })
}

export const getProject = (req, res) => {
    const id = parseInt(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Project ID must be a positive integer'
        });
    }

    const project = getProjectById(id);
    if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
        success: true,
        data: project,

    })
}

export const addProject = (req, res) => {
    const { title, description, technologies, githubUrl, liveUrl } = req.body;
    if (
        typeof title !== 'string' || !title.trim() ||
        typeof description !== 'string' || !description.trim() ||
        !Array.isArray(technologies)
    ) {
        return res.status(400).json({
            success: false,
            message: 'Title, description, and technologies are required'
        });
    }
    const newProject = createProject({
        id: projects.length + 1,
        title,
        description,
        technologies,
        githubUrl,
        liveUrl
    });
    res.status(201).json({
        success: true,
        data: newProject
    });
}

export const editProject = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Project ID must be a positive integer'
        });
    }

    const allowedFields = [
        'title',
        'description',
        'technologies',
        'githubUrl',
        'liveUrl'
    ];

    const updates = {};

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    }
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Provide at least one valid field to update'
        });
    }

    if (
        ('title' in updates &&
            (typeof updates.title !== 'string' || !updates.title.trim())) ||
        ('description' in updates &&
            (typeof updates.description !== 'string' ||
                !updates.description.trim())) ||
        ('technologies' in updates &&
            (!Array.isArray(updates.technologies) ||
                !updates.technologies.every((item) => typeof item === 'string'))) ||
        ['githubUrl', 'liveUrl'].some(
            (field) =>
                field in updates &&
                typeof updates[field] !== 'string'
        )
    ) {
        return res.status(400).json({
            success: false,
            message: 'One or more project fields have an invalid value'
        });
    }
    if (typeof updates.title === 'string') {
        updates.title = updates.title.trim();
    }

    if (typeof updates.description === 'string') {
        updates.description = updates.description.trim();
    }

    const project = updateProject(id, updates);

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

export const removeProject = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Project ID must be a positive integer'
        });
    }

    const project = deleteProject(id);

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