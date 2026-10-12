import Project from '../models/Project.js';
export const getAllProjects = () => {
    return Project.find().sort({ createdAt: -1 });
}

export const getProjectById = (id) => {
    return Project.findById(id);
}

export const createProject = (projectData) => {
    const newProject = new Project(projectData);
    return newProject.save();
};


export const updateProject = (id, updates) => {
    const project = getProjectById(id);

    if (!project) {
        return null;
    }
    return Project.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
};

export const deleteProject = (id) => {
    const project = getProjectById(id);
    console.log('project:', project);
    if (!project) {
        return null;
    }

    return Project.findByIdAndDelete();

    // const [deletedProject] = projects.splice(projectIndex, 1);

    // return deletedProject;
};