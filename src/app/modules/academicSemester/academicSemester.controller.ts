import { Request, Response, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterDate } = req.body;
    const result =
      await AcademicSemesterService.createSemester(academicSemesterDate);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester  create successfully....✅',
      data: result,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
};
