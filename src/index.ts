import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import passport from "passport";
import { config } from './config/config';
import { connectDatabase } from './config/mongoose-config.service';
import { UserRoutes } from './routes/user.route';
import { ExpenseRoutes } from './routes/expense.route';
import { DashboardRoutes } from './routes/dashboard.route';
import path from 'path';

const PORT = config.PORT;
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

const runningMessage = `Server running at http://localhost:${PORT}/`;

app.use('/api/user', new UserRoutes().router);
app.use('/api/expense', new ExpenseRoutes().router);
app.use('/api/dashboard', new DashboardRoutes().router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    
    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
app.get("/", (req: Request, res: Response) => {
    res.send(runningMessage);
});

connectDatabase();

app.listen(PORT, () => {
    console.log(runningMessage);
});
