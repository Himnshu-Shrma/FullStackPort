import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        keyPoints: {
            type: [String],
            required: true
        },

        technologies: {
            type: [String],
            required: true
        },

        githubUrl: {
            type: String,
            trim: true
        },

        liveUrl: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const Project = mongoose.model('Project', projectSchema);

export default Project;
/*
Schema
    ↓
defines structure

Model
    ↓
provides database operations

Document
    ↓
actual data
*/