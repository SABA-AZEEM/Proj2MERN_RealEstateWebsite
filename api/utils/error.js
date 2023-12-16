//This middleware is for those kind of errors that are not actually occur, but I want to throw an error in particular situation.

export const errorHandler = (statusCode,message) => {
    const error = new Error();
    error.message= message;
    error.statusCode = statusCode;
    return error;
};