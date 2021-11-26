import * as moviesRepository from "../repositories/moviesRepository.js";
import * as moviesService from "../services/moviesService.js"


const getMovies = async (req, res) => {
    const result = await moviesRepository.selectAllMovies();
    const movies = result.rows;

    return res.send(movies)
}

const getMovieInfo = async (req, res) => {
    const movie = await moviesService.handleMovieInfo(req);

    if(!movie){
        return res.sendStatus(404);
    }

    return res.send(movie)
}

const getMovieSessions = async (req, res) => {
    const sessions = await moviesService.handleSessionsInfo(req)

    if(!sessions) {
      return res.sendStatus(404);
    }

    return res.send(sessions);
}

export {
    getMovies,
    getMovieInfo,
    getMovieSessions,
}