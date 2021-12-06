import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const runningMessage = `Server running at http://localhost:${PORT}/`;


app.get("/", (req: Request, res: Response) => {
    res.send(runningMessage);
});

app.listen(PORT, () => {
    console.log(runningMessage);
});
