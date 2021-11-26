import connection from "../database.js"

const selectAllSessionSeats = async (id) => {
    const result = await connection.query(`SELECT session_seats.*, movies_info.title, movies_info.image,  
    movie_sessions.hour, movie_sessions.movie_id FROM session_seats 
    JOIN movie_sessions ON session_seats.session_id = movie_sessions.id
    JOIN movies_info ON movies_info.id = movie_sessions.movie_id
    WHERE session_seats.session_id = $1`, [id]);

    return result
}
export {
    selectAllSessionSeats,
}