import express from 'express';
import cors from 'cors';
import * as movieController from "./controllers/moviesController.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/movies', (req, res) => movieController.getMovies(req, res));


export default app;
