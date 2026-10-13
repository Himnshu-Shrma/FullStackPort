import { hash, verify } from "@node-rs/argon2";
import Admin from '../models/Admin.js';
export const login = async (req, res) => {
    const { username, password } = req.body ?? {};

    if (typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username.trim() ||
        !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required and must be strings'
        });
    }
    const admin = await Admin.findOne({ username: username.trim().toLowerCase() }).select('+passwordHash');
    // Use the same message for an unknown username and a wrong password.
    if (!admin || !(await verify(admin.passwordHash, password))) {
        return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }

    // Rotate the session ID after successful authentication.
    req.session.regenerate((error) => {
        if (error) {
            return next(error);
        }

        req.session.adminId = admin._id.toString();

        req.session.save((saveError) => {
            if (saveError) {
                return next(saveError);
            }

            return res.status(200).json({
                success: true,
                message: 'Login successful'
            });
        });
    });
}

export const logout = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.clearCookie('portfolio.sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    });
};