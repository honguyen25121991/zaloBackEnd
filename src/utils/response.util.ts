export function createResponse(statusCode: number, message: string, result: any,date:Date) {
    return {
        statusCode,
        message,
        result,
        date
    };
}