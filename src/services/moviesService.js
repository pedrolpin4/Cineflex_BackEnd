import * as movieRepository from "../repositories/moviesRepository.js"

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

export default handleMovieInfo