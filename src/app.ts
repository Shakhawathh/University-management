import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleWares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
// import ApiError from './errors/ApiError'

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/users/', UserRoutes);

// Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   next('error is err')
// })

//global error handler
app.use(globalErrorHandler);

export default app;
