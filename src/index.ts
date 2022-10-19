import express from 'express';
import routes from './routes';
import cors from "cors";
require('dotenv').config()
const app = express();


app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(cors());

routes(app);

app.listen(process.env.PORT || 3333, () => console.log('Api iniciada'));