import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidatorError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  };
};

export default handleValidatorError;
