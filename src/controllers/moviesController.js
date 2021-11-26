import dayjs from "dayjs";
import connection from "../database.js";
import * as moviesRepository from "../repositories/moviesRepository.js";
import handleMovieInfo from "../services/moviesService.js"


const getMovies = async (req, res) => {
    const result = await moviesRepository.selectAllMovies();
    const movies = result.rows;

    return res.send(movies)
}

const getMovieInfo = async (req, res) => {
    const movie = await handleMovieInfo(req);

    if(!movie){
        return res.sendStatus(404);
    }

    return res.send(movie)
}

const getMovieSessions = async (req, res) => {
    const {
        id
    } = req.params;

    const result = await connection.query(`
        SELECT movie_sessions.id, movie_sessions.hour, movies_info.title, movies_info.image 
        FROM movie_sessions JOIN movies_info 
        ON movies_info.id = movie_sessions.movie_id 
        WHERE movie_id = $1
    `, [id]);

    const sessions = result.rows.map((session) => ({
        id: session.id,
        hour: dayjs(session.hour).format('HH:mm'),
        day: dayjs(session.hour).format('YYYY/MM/DD'),
        weekday: dayjs(session.hour).$W,
        movie: {
            title: session.title,
            image: session.image,
        }
    }));

    if(!result.rowCount) {
      return res.sendStatus(404);
    }

    return res.send(sessions);
}

export {
    getMovies,
    getMovieInfo,
    getMovieSessions,
}