import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config();

const { SESSION_SECRET, MONGO_URL, NODE_ENV } = process.env;
console.log('SESSION_SECRET:', process.env);
if (!SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in environment variables');
}
if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined in environment variables');
}

const sessionConfig = session({
    name: 'Himanshu',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        collectionName: 'sessions',
        ttl: 60 * 60 * 8
    }),

    cookie: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 8,
        path: '/',
        sameSite: 'lax'
    }
})
export default sessionConfig;