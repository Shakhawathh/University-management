import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterDate } = req.body;
    const result =
      await AcademicSemesterService.createSemester(academicSemesterDate);
    res.status(200).json({
      success: true,
      message: 'Academic Semester  create successfully....✅',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
