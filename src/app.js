import express from 'express';
import cors from 'cors';
import * as movieController from "./controllers/moviesController.js";
import * as seatControllers from "./controllers/seatsController.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/sessions/:id/seats', (req, res) => seatControllers.getSeats(req, res))

app.get('/movies', (req, res) => movieController.getMovies(req, res));
app.get('/movies/:id', (req, res) => movieController.getMovieInfo(req, res));
app.get('/movies/:id/sessions', (req, res) => movieController.getMovieSessions(req, res));


export default app;
