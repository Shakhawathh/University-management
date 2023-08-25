import { AcademicSemesterValidation } from './academicSemester.validation';
import express from 'express';
import validateRequest from '../../middleWares/validateRequest';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  // UserController.createUser,
);

export const UserRoutes = router;
