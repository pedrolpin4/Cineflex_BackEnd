import connection from "../database.js"

const selectAllMovies = async () => {
    const result = await connection.query('SELECT image, id, title FROM movies_info');
    return result
}

export {
    selectAllMovies,
}