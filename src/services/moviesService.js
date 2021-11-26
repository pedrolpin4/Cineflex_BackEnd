import dayjs from "dayjs";
import * as movieRepository from "../repositories/moviesRepository.js";

const handleMovieObject = (result) => {
    const movie = result.rows[0];
    return({
        id: movie.id,
        image: movie.image,
        title: movie.title,
        year: movie.year,
        imdbId: movie.imdb_id,
        rating: Number(movie.rating),
        runningTime: movie.running_time,
    })
}

const handleMovieInfo = async (req) => {
    const {
        id
    } = req.params;
    
    const result = await movieRepository.selectSpecificMovie(id)

    if (!result.rowCount){
        return null;
    }

    return handleMovieObject(result);
};

const handleSessionsObject = (result) => {
    const sessions = {
        movie: {
            title: result.rows.title,
            image: result.rows.image,
        },
        sessions : result.rows.map((session) => ({
            id: session.id,
            hour: dayjs(session.hour).format('HH:mm'),
            date: dayjs(session.hour).format('YYYY/MM/DD'),
            weekday: dayjs(session.hour).$W,
        })),
    }

    return sessions
}

const handleSessionsInfo = async (req) => {
    const {
        id
    } = req.params;

    const result = await movieRepository.selectAllMovieSessions(id);

    if(!result.rowCount) {
        return null
    }

    return handleSessionsObject(result)
}

export {
    handleMovieInfo,
    handleSessionsInfo,
}