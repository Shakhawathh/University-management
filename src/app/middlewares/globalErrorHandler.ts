/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessages } from '../../interfaces/error';
import config from '../../config';
import handleValidatorError from '../../errors/handleValidatorError';
import ApiError from '../../errors/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from './handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('🐸🐸 globalErrorHandler ~', error)
    : errorLogger.error('🐸🐸 globalErrorHandler ~', error);

  let statusCode = 500;
  let message = 'Something went wrong ..!';
  let errorMessages: IGenericErrorMessages[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidatorError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  {
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      stack: config.env !== 'production' ? error?.stack : undefined,
    });
  }
  next();
};

export default globalErrorHandler;
