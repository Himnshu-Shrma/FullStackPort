const requestLogger = (req, res, next) => {
    const { method, url, body } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url} - Body:`, body);
    next();
}

export default requestLogger;