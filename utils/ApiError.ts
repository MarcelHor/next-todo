class ApiError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = 'CustomError'
    }
}

export default ApiError;