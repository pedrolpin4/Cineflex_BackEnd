import connection from "../database.js"

const selectAllMovies = async () => {
    const result = await connection.query('SELECT image, id, title FROM movies_info ORDER BY rating DESC');
    return result
}

const selectSpecificMovie = async (id) => {
    const result = await connection.query('SELECT * FROM movies_info WHERE id = $1', [id]);
    return result
}

const selectAllMovieSessions = async (id) => {
    const result = await connection.query(`
        SELECT movie_sessions.id, movie_sessions.hour, movies_info.title, movies_info.image 
        FROM movie_sessions JOIN movies_info 
        ON movies_info.id = movie_sessions.movie_id 
        WHERE movie_id = $1
    `, [id]);

    return result
}

export {
    selectAllMovies,
    selectSpecificMovie,
    selectAllMovieSessions,
}