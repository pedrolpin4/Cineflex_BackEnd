import connection from "../database.js";

const getMovies = async (req, res) => {
    const result = await connection.query("SELECT * FROM movies_info");
    const movies = result.rows.map(movie => ({
        id: movie.id,
        title: movie.title,
        image: movie.image,
    }));

    res.send(movies)
}


const getMovieInfo = async () => {

}

export {
    getMovies,
    getMovieInfo,
}