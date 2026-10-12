import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit the process with an error code
    }
}
startServer();

/**
npm run dev
    │
    ▼
server.js
    │
    ▼
connectDatabase()
    │
    ├── Failed
    │     ↓
    │   process exits
    │
    └── Successful
            ↓
        app.listen()
            ↓
        API available
*/