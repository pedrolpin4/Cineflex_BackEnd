import * as moviesRepository from "../repositories/moviesRepository.js"

const getMovies = async (req, res) => {
    const result = await moviesRepository.selectAllMovies();
    const movies = result.rows;
    
    res.send(movies)
}


const getMovieInfo = async () => {

}

export {
    getMovies,
    getMovieInfo,
}