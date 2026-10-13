
import mongoose from 'mongoose';

import Admin from '../models/Admin.js';

const requireAdmin = async (req, res, next) => {
    const adminId = req.session?.adminId;

    if (!adminId || !mongoose.isValidObjectId(adminId)) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    req.admin = admin;

    next();
};

export default requireAdmin;