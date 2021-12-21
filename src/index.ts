import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { config } from './config/config';
import { connectDatabase } from './config/mongoose-config.service';
import { UserRoutes } from './routes/user.route';
import { ExpenseRoutes } from './routes/expense.route';

dotenv.config();

const PORT = config.PORT;
const app: Application = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const runningMessage = `Server running at http://localhost:${PORT}/`;

app.use('/api/user', new UserRoutes().router);
app.use('/api/expense', new ExpenseRoutes().router);

app.get("/", (req: Request, res: Response) => {
    res.send(runningMessage);
});

connectDatabase();

app.listen(PORT, () => {
    console.log(runningMessage);
});
