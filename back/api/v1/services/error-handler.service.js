
function hanldeError(error) {
    let handle = { statusCode: 500, message: 'Error genérico' };
    console.log('Error handler: ', error.name);
    console.log('Error handler: ', error);
    if (error instanceof AuthenticationError) {
        handle.statusCode = 401;
        handle.message = error.message;
    } else if (error instanceof VersionError) {
        handle.statusCode = 505;
        handle.message = error.message;
        handle.version = error.serverVersion;
    } else if (error instanceof CustomError) {
        handle.statusCode = error.statusCode;
        handle.message = error.message;
    } 
    return [handle.statusCode, handle.message];
}

class AuthenticationError extends Error {
    constructor(name, message) {
      super(message)
        if (Error.captureStackTrace) { Error.captureStackTrace(this, AuthenticationError); }
        this.name = name;
    }
}

class VersionError extends Error {
    constructor(name, message, serverVersion) {
      super(message)
        if (Error.captureStackTrace) { Error.captureStackTrace(this, VersionError); }
        this.name = name;
        this.serverVersion = serverVersion;
    }
}

class CustomError extends Error {
    constructor(name, message, statusCode) {
      super(message)
        if (Error.captureStackTrace) { Error.captureStackTrace(this, VersionError); }
        this.name = name;
        this.statusCode = statusCode;
    }
}

module.exports = {
    hanldeError,
    AuthenticationError,
    VersionError,
    CustomError,
};