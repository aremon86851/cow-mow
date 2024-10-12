import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', routes);

// app.get('/', (req: Request, res: Response) => {
//   throw new ApiError(httpStatus.BAD_REQUEST, 'Errors is done');
//   // res.send({ message: 'ssss' });
// });
app.use(globalErrorHandler);

export default app;

//11.7
