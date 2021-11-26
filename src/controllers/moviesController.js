import * as moviesRepository from "../repositories/moviesRepository.js";
import * as moviesService from "../services/moviesService.js"


const getMovies = async (req, res) => {
    try{
        const result = await moviesRepository.selectAllMovies();
        const movies = result.rows;
        
        return res.send(movies)
    } catch(error) {
        return res.sendStatus(500)
    }
}

const getMovieInfo = async (req, res) => {
    try {
        const movie = await moviesService.handleMovieInfo(req);

        if(!movie){
            return res.sendStatus(404);
        }

        return res.send(movie)
    } catch (error) {
        return res.sendStatus(500)
    }
}

const getMovieSessions = async (req, res) => {
    try {
        const sessions = await moviesService.handleSessionsInfo(req)

        if(!sessions) {
        return res.sendStatus(404);
        }

        return res.send(sessions);
    } catch (error){
        return res.sendStatus(500)
    }
}

export {
    getMovies,
    getMovieInfo,
    getMovieSessions,
}