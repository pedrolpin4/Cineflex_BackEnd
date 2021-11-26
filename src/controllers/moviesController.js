import connection from "../database.js";
import * as moviesRepository from "../repositories/moviesRepository.js"

const getMovies = async (req, res) => {
    const result = await moviesRepository.selectAllMovies();
    const movies = result.rows;

    res.send(movies)
}


const getMovieInfo = async (req, res) => {
    const {
        id
    } = req.params;

    const result = await connection.query('SELECT * FROM movies_info WHERE id = $1', [id])

    if(!result.rowCount){
        res.sendStatus(404)
        return;
    }

    const movie = result.rows[0];
    res.send({
        id: movie.id,
        image: movie.image,
        title: movie.title,
        year: movie.year,
        imdbId: movie.imdb_id,
        rating: Number(movie.rating),
        runningTime: movie.running_time,
    });
}

export {
    getMovies,
    getMovieInfo,
}