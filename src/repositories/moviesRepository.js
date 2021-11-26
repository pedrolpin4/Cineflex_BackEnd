import connection from "../database.js"

const selectAllMovies = async () => {
    const result = await connection.query('SELECT image, id, title FROM movies_info');
    return result
}

const selectSpecificMovie = async (id) => {
    const result = await connection.query('SELECT * FROM movies_info WHERE id = $1', [id]);
    return result
}

export {
    selectAllMovies,
    selectSpecificMovie,
}