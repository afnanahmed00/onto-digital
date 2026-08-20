/**
 * Base class for operational errors — problems expected as part of normal
 * API operation (bad input, missing resource, unauthorized, etc.) whose
 * message is safe to send straight to the client. Anything thrown that
 * ISN'T an AppError is treated as an unexpected/programmer error and hidden
 * from the client in production (see middleware/errorHandler.ts).
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational = true;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Invalid request.") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized.") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden.") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found.") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource already exists.") {
    super(message, 409);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests. Please try again later.") {
    super(message, 429);
  }
}
