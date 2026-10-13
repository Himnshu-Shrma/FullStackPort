import { z } from 'zod';

const projectFields = {
    title: z.string().trim().min(1, 'Title is required').max(150),
    description: z.string().trim().min(1, 'Description is required').max(5000),
    keyPoints: z
        .array(z.string().trim().min(1, 'Key point cannot be empty'))
        .min(1, 'At least one key point is required'),
    technologies: z
        .array(z.string().trim().min(1, 'Tech point cannot be empty'))
        .min(1, 'At least one technology is required'),
    githubUrl: z.url().optional(),
    liveUrl: z.url().optional()
};

export const projectCreationSchema = z.object(projectFields);

export const projectUpdationSchema = z
    .object(projectFields)
    .partial()
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
        message: 'At least one field must be provided for update'
    });

export const projectIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid project ID format')
})