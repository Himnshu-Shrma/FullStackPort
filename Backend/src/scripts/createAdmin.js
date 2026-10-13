import { hash } from '@node-rs/argon2';
import dotenv from 'dotenv';
dotenv.config();
import connectDatabase from '../config/database.js';
import Admin from '../models/Admin.js';

const createAdmin = async () => {
    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
        throw new Error('Admin credentials are missing from .env');
    }

    const d=await connectDatabase();

    const username = ADMIN_USERNAME.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
        console.log('Admin account already exists.');
        return;
    }

    const passwordHash = await hash(ADMIN_PASSWORD);

    const result = await Admin.create({
        username,
        passwordHash
    });

    console.log('Admin account created successfully.');
};


try {
    await createAdmin();
} catch (error) {
    console.error('Failed to create admin:', error.message);
    process.exitCode = 1;
} finally {
    const mongoose = await import('mongoose');
    await mongoose.default.disconnect();
}