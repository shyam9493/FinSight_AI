import express, { Request, Response } from 'express';

import { Environment } from './env';


const app = express();
const port = Environment.PORT || 3000;


app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
