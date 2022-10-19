import express from 'express';
import routes from './routes';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(cors());

routes(app);

app.listen(8080, () => console.log('Api iniciada'));