
import express from 'express';
import projectsRoutes from './routes/projectsRoutes.js';
import requestLogger from './middlewares/requestLogger.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Portfolio API is healthy'
    });
});

app.use('/api/projects', projectsRoutes);

// Handle unknown endpoints
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

app.get('/test-error', (req, res, next) => {
    next(new Error('Test error'));
});

// Error-handling middleware must come after routes
app.use(errorHandler);

export default app;