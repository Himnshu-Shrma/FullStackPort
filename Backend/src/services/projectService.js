import projects from '../data/projects.js';

export const getAllProjects = () => {
    return projects;
}

export const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
};

export const createProject = (projectData) => {
    const newProject = {
        ...projectData
    };

    projects.push(newProject);

    return newProject;
};


export const updateProject = (id, updates) => {
    const project = getProjectById(id);

    if (!project) {
        return null;
    }

    Object.assign(project, updates);

    return project;
};

export const deleteProject = (id) => {
    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex === -1) {
        return null;
    }

    const [deletedProject] = projects.splice(projectIndex, 1);

    return deletedProject;
};