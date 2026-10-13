const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const result = schema.safeParse(req[property]);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }

        // Replace the input with its validated version.
        // This also applies transformations such as trimming strings.
        if (property === 'body') {
            req.body = result.data;
        }

        next();
    };
};

export default validate;